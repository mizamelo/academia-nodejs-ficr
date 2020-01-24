const Mail = require('../lib/Mail')

class AuthenticateMail{
    constructor(){
        this.key = "Registrationmail"
    }
    async handle({ data }) {
        const { user } = data
        await Mail.sendMail({
            from: "No-Reply <franciscotest-db8a29@inbox.mailtrap.io>",
            to: `${user.name} <${user.email}>`,
            subject: `Cadastro de usuario`,
            html: `Olá, ${user.name}, Bem vindo a selva`
        })
    }
}

module.exports = new AuthenticateMail()