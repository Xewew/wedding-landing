import logging
import requests
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)

BOT_TOKEN = "8868304668:AAE0ajl3mM5KdRZfYGAJWXnHjAUwYOZJJVE"
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

alcohol_names = {
    'vodka': 'Водка',
    'wine': 'Вино',
    'champagne': 'Шампанское',
    'whiskey': 'Виски',
    'cognac': 'Коньяк',
    'tequila': 'Текила',
    'samogon': 'Самогон',
    'none': 'Не пьёт'
}

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Привет! Я бот для свадебных приглашений.\n"
        "Используйте /stats для просмотра статистики ответов."
    )

async def stats(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        response = requests.get(GOOGLE_SCRIPT_URL)
        data = response.json()

        total = data.get('total', 0)
        yes_count = data.get('yes', 0)
        no_count = data.get('no', 0)
        alcohol_stats = data.get('alcohol', {})

        text = f"📊 <b>Статистика ответов</b>\n\n"
        text += f"👥 Всего ответов: <b>{total}</b>\n"
        text += f"✅ Придут: <b>{yes_count}</b>\n"
        text += f"❌ Не придут: <b>{no_count}</b>\n\n"
        text += "🍷 <b>Предпочтения по алкоголю:</b>\n"

        for alc, count in sorted(alcohol_stats.items(), key=lambda x: -x[1]):
            name = alcohol_names.get(alc, alc)
            text += f"  • {name}: <b>{count}</b>\n"

        await update.message.reply_text(text, parse_mode='HTML')

    except Exception as e:
        logging.error(f"Error fetching stats: {e}")
        await update.message.reply_text("Ошибка при получении статистики.")

def main():
    application = Application.builder().token(BOT_TOKEN).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("stats", stats))

    application.run_polling()

if __name__ == "__main__":
    main()
