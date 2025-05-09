rabbitmqadmin declare exchange name='notifications' type='fanout' durable=true
rabbitmqadmin declare queue name='notifications' durable=true
rabbitmqadmin declare binding source='notifications' destination_type='queue' destination='notifications'