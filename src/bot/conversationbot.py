import logging
import json, requests

from telegram import ReplyKeyboardMarkup, ReplyKeyboardRemove, Update
from telegram.ext import (
    Updater,
    CommandHandler,
    MessageHandler,
    Filters,
    ConversationHandler,
    CallbackContext,
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
    reply_keyboard = [['😃', '😐', '😞']]

    update.message.reply_text(
        'Por favor, envía tu emoji: 😃, 😐, 😞',
        reply_markup=ReplyKeyboardMarkup(
            reply_keyboard, one_time_keyboard=True, input_field_placeholder='Feliz, regular o triste?'
        ),
    )

    return EMOTION


def comment(update: Update, context: CallbackContext) -> int:
    """Almacena el emoji y pide el comentario."""
    user = update.message.from_user
    emotion = update.message.text
    logger.info("Emocion de %s: %s", user.first_name, update.message.text)
    if emotion == "😃" or emotion == "😐" or emotion == "😞":
        update.message.reply_text(
            '¿Quieres agregar un comentario a tu emoción?')
        return COMMENT
    else:
        update.message.reply_text(
            'Con esa respuesta no puedo almacenar tu emoción')


def post(update: Update, context: CallbackContext) -> int:
    """Stores the photo and asks for a location."""
    user = update.message.from_user
    comment = update.message.text
    logger.info("Comment of %s: %s", user.first_name, comment)
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
    updater = Updater("5095765162:AAGmjvUuuef7gWk7Qg57-gt0vogPfCSntH4")

    # Get the dispatcher to register handlers
    dispatcher = updater.dispatcher

    # Add conversation handler with the states GENDER, PHOTO, LOCATION and BIO
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            EMOTION: [MessageHandler(Filters.regex('^(😃|😐|😞)$'), comment)],
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
