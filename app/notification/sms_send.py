from twilio.rest import Client
from config import *

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def send_sms(phone_no):
    try:
        message = client.messages.create(
            body="Expiry date reached",
            from_=TWILIO_PHONE_NUMBER,
            to=phone_no
        )
        print(f"SMS sent to {phone_no}: SID {message.sid}")
    except Exception as e:
        print(f"Failed to send SMS to {phone_no}: {e}")
