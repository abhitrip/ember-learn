import Controller from '@ember/controller';

export default Controller.extend({
    isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
    isMessageLongEnough: Ember.computed.gte('message.length', 5),
    isValid: Ember.computed.and('isValidEmail', 'isMessageLongEnough'),

    actions: {
        sendMessage(){
            let email = this.get('emailAddress');
            let message = this.get('message');
            alert('Sending your message in progress... ');
            let responseMessage = 'To: ' + email + ', Message: ' + message;
            this.set('responseMessage', responseMessage);
            this.set('emailAddress', '');
            this.set('message', '');

        }
    }
});
