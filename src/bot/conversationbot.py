import logging
import json, requests

from telegram import ReplyKeyboardMarkup, ReplyKeyboardRemove, Update, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import (
    Updater,
    CommandHandler,
    MessageHandler,
    Filters,
    ConversationHandler,
    CallbackContext,
    CallbackQueryHandler
)

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)

logger = logging.getLogger(__name__)

EMOTION, COMMENT, LOCATION, BIO = range(4)

emotion = ""

def start(update: Update, context: CallbackContext) -> int:
    """Incia la conversación y pide el emoji."""
    ##teclado = [['😃', '😐', '😞']]
    keyboard = [
        [
            InlineKeyboardButton("😃", callback_data='Feliz'),
            InlineKeyboardButton("😐", callback_data='Regular'),
            InlineKeyboardButton("😞", callback_data='Triste')
        ]
    ]

    update.message.reply_text(
        'Por favor, envía tu emoji: 😃, 😐, 😞',
        reply_markup=InlineKeyboardMarkup(
            keyboard, one_time_keyboard=True
        ),
    )

    return EMOTION

def button(update: Update, context: CallbackContext) -> int:
    """Parses the CallbackQuery and updates the message text."""
    query = update.callback_query

    # CallbackQueries need to be answered, even if no notification to the user is needed
    # Some clients may have trouble otherwise. See https://core.telegram.org/bots/api#callbackquery
    query.answer()
    print(update)

def comment(update: Update, context: CallbackContext) -> int:
    """Almacena el emoji y pide el comentario."""
    user = update.message.from_user
    emotion = update.message.text
    logger.info("Emocion de %s: %s", user.first_name, update.message.text)
    update.message.reply_text(
            '¿Quieres agregar un comentario a tu emoción?')
    return COMMENT


def post(update: Update, context: CallbackContext) -> int:
    """Almacena el comentario y hace el post a la API"""
    user = update.message.from_user
    comment = update.message.text
    logger.info("Comentario de %s: %s", user.first_name, comment)
    update.message.reply_text(
        'Gracias. Almacenaré tu emoción y comentario.')
    #Post a la API
    print(update["message"]["chat"]["username"],emotion,comment,str(update.message.date))
    url = "https://3001-rose-haddock-94adoe3x.ws-us25.gitpod.io/api/bot"
    payload = json.dumps({
        "username": update["message"]["chat"]["username"],
        "respuesta": emotion,
        "comentario": comment,
        "fecha": str(update.message.date)
    })
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    print("Intenté agregar información a la API")

    return ConversationHandler.END

def cancel(update: Update, context: CallbackContext) -> int:
    """Cancels and ends the conversation."""
    user = update.message.from_user
    logger.info("User %s canceled the conversation.", user.first_name)
    update.message.reply_text(
        'Bye! I hope we can talk again some day.', reply_markup=ReplyKeyboardRemove()
    )

    return ConversationHandler.END


def main() -> None:
    """Run the bot."""
    # Create the Updater and pass it your bot's token.
    updater = Updater("5063497991:AAEX_bLGzoIzyPkC2gWBU7kZsjIvuvM2Pds")

    # Get the dispatcher to register handlers
    dispatcher = updater.dispatcher

    # Add conversation handler with the states GENDER, PHOTO, LOCATION and BIO
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            EMOTION: [MessageHandler(Filters.regex('^(Feliz|Regular|Triste)$'), comment)],
            COMMENT: [MessageHandler(Filters.text & ~Filters.command, post)],
        },
        fallbacks=[CommandHandler('cancel', cancel)],
    )

    

    dispatcher.add_handler(conv_handler)

    # Start the Bot
    updater.start_polling()

    # Run the bot until you press Ctrl-C or the process receives SIGINT,
    # SIGTERM or SIGABRT. This should be used most of the time, since
    # start_polling() is non-blocking and will stop the bot gracefully.
    updater.idle()


if __name__ == '__main__':
    main()
