import commands
import json
import socket
import time
import datetime
import urllib2
import config
import random
import sched
import threading

def send_msg(phone_list, message=None):
    """
    send msg
    """
    if config.quiet_mode == "true":
        print "quiet mode ,msg not send: " + message
        return
    sender = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        sender.connect((config.MSG_SERVER, config.MSG_PORT, ))
        phone = ",".join(phone_list)
        sender.send("%s@%s" % (phone, message))
    except socket.error:
        print "conncet msg server error"
        return
    sender.close()

def send_email(subject, content, email_list, html=False):
    """
    send email
    """
    if config.quiet_mode == "true":
        print "quiet mode ,msg not send: " + content
        return
    email = " ".join(email_list)
    if html:
        subject = '$(echo -e "%s\nContent-Type: text/html")' % subject
    cmd = 'echo "%s" | mail -s "%s" %s' % \
          (content, "[AIS Alarm] " + subject, email)
    status, output = commands.getstatusoutput(cmd)
    if status != 0:
        print "send email error %s %s %s" % (status, output, cmd)
