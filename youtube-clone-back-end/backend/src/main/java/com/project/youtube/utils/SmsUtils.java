package com.project.youtube.utils;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;


public class SmsUtils {
    public static final String TWILIO_PHONE_NUMBER = System.getenv("TWILIO_PHONE_NUMBER");
    public static final String TWILIO_SID_KEY = System.getenv("TWILIO_SID_KEY");
    public static final String TWILIO_AUTH_TOKEN_KEY = System.getenv("TWILIO_AUTH_TOKEN_KEY");;

    public static void sendSms(String to, String messageBody) {
        Twilio.init(TWILIO_SID_KEY, TWILIO_AUTH_TOKEN_KEY);
        Message message = Message.creator(
                new PhoneNumber(to),
                new PhoneNumber(TWILIO_PHONE_NUMBER),
                messageBody
        ).create();
        System.out.println(message.getSid());
    }
}
