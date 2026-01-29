from django.contrib import admin
from .models import Shift, Commitment, RecoveryRule, EventLog

admin.site.register(Shift)
admin.site.register(Commitment)
admin.site.register(RecoveryRule)
admin.site.register(EventLog)
