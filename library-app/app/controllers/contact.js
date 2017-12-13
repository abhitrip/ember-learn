import Controller from '@ember/controller';

export default Controller.extend({
    isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
    isMessageLongEnough: Ember.computed.gte('message.length', 5),
    isValid: Ember.computed.and('isValidEmail', 'isMessageLongEnough'),

    actions: {
        sendMessage(){
            let email = this.get('emailAddress');
            let message = this.get('message');
            
            const newContact = this.store.createRecord('contact',{
                email:email, 
                message: message
            });

            newContact.save().then((response)=> {
                let responseMessage = 'To: ' + response.get('email') + ', Message: ' + response.get('message');
                this.set('responseMessage', responseMessage);
                this.set('emailAddress', '');
                this.set('message', '');
            });

        },
        willTransition() {
            // rollbackAttributes() removes the record from the store
            // if the model 'isNew'
            this.controller.get('model').rollbackAttributes();
        }
    }
});
