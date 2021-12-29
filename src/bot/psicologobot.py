import logging
import requests
import json
import pytz

from telegram import Update, ForceReply
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext
from datetime import datetime, tzinfo
from dateutil import tz

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)

logger = logging.getLogger(__name__)




# Define a few command handlers. These usually take the two arguments update and
# context.
def start(update: Update, context: CallbackContext) -> None:
    """Send a message when the command /start is issued."""
    user = update.effective_user
    update.message.reply_markdown_v2(
        fr'Hola, {user.mention_markdown_v2()}, por favor, de entre estos emojis envía el que más represente tu estado de ánimo actual: 😃 , 😐 o 😞\!')


def store(update: Update, context: CallbackContext) -> None:
    emotion = update.message.text
    print(emotion)
    print("Id de usuario " + str(update.message.chat.id))
    print("Nombre: " + update.message.chat.first_name + " " + update.message.chat.last_name)
    print("Fecha: + " + str(update.message.date))
    """
    # Date conversion:
    ## dt_str  = "28/12/2021 8:18:19"
    dt_str = str(update.message.date)
    ## format  = "%d/%m/%Y %H:%M:%S"
    format  = "/%Y/%m/%d %H:%M:%S"
    dt_utc = datetime.strptime(dt_str, format)
    dt_utc = dt_utc.replace(tzinfo=pytz.UTC)
    local_zone = tz.tzlocal()
    dt_local = dt_utc.astimezone(local_zone)
    local_time_str = dt_local.strftime(format)
    ##################################### 
    """
    if emotion == "😃" or emotion == "😐" or emotion == "😞":
        update.message.reply_text("Gracias. Almacenaré tu estado de ánimo en la base de datos")
    else: 
        update.message.reply_text("Tu mensaje no me permite almacenar tu emoción, intenta de nuevo, por favor")
def all_messages(update: Update, context: CallbackContext) -> None:
    """Show all messages to the user message."""
    url = "https://3001-apricot-scorpion-ulosbcd8.ws-us25.gitpod.io/api/message"
    payload={}
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    update.message.reply_text(response.text)

   
def main() -> None:
    """Start the bot."""
    # Create the Updater and pass it your bot's token.
    updater = Updater("5095765162:AAGmjvUuuef7gWk7Qg57-gt0vogPfCSntH4")

    # Get the dispatcher to register handlers
    dispatcher = updater.dispatcher

    # on different commands - answer in Telegram
    dispatcher.add_handler(CommandHandler("start", start))
    ## dispatcher.add_handler(CommandHandler("help", help_command))
    dispatcher.add_handler(CommandHandler("messages", all_messages))

    # on non command i.e message - echo the message on Telegram
    dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, store))

    # Start the Bot
    updater.start_polling()

    # Run the bot until you press Ctrl-C or the process receives SIGINT,
    # SIGTERM or SIGABRT. This should be used most of the time, since
    # start_polling() is non-blocking and will stop the bot gracefully.
    updater.idle()


if __name__ == '__main__':
    main()