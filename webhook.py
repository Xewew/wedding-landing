import logging
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from telegram import Bot
from telegram.constants import ParseMode

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)

BOT_TOKEN = "8868304668:AAE0ajl3mM5KdRZfYGAJWXnHjAUwYOZJJVE"
CHAT_ID = "1453758150"

bot = Bot(token=BOT_TOKEN)

alcohol_names = {
    'vodka': 'Водка',
    'wine': 'Вино',
    'champagne': 'Шампанское',
    'whiskey': 'Виски',
    'cognac': 'Коньяк',
    'tequila': 'Текила',
    'samogon': 'Самогон',
    'none': 'Не будет пить'
}

attendance_names = {
    'yes': 'Да, придёт',
    'no': 'Нет, не сможет'
}

class WebhookHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)

        try:
            data = json.loads(body.decode('utf-8'))
            name = data.get('name', 'Не указано')
            attendance = data.get('attendance', 'unknown')
            alcohol = data.get('alcohol', 'unknown')

            attendance_text = attendance_names.get(attendance, attendance)
            alcohol_text = alcohol_names.get(alcohol, alcohol)

            message = (
                f"💒 <b>Новый ответ на анкету</b>\n\n"
                f"👤 <b>Имя:</b> {name}\n"
                f"📅 <b>Присутствие:</b> {attendance_text}\n"
                f"🍷 <b>Алкоголь:</b> {alcohol_text}"
            )

            import asyncio
            asyncio.run(bot.send_message(
                chat_id=CHAT_ID,
                text=message,
                parse_mode=ParseMode.HTML
            ))

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok"}).encode('utf-8'))

        except Exception as e:
            logging.error(f"Error processing request: {e}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "error"}).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def log_message(self, format, *args):
        logging.info(f"{self.client_address[0]} - {format % args}")

def main():
    port = 8080
    server = HTTPServer(('0.0.0.0', port), WebhookHandler)
    logging.info(f"Webhook server started on port {port}")
    server.serve_forever()

if __name__ == "__main__":
    main()
