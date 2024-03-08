exports.sendEmail = function(email, link) {
    // very awkward syntax to work around the mismatched "type" in json package. We are operating in 
    // type 'module', but node-mailjet is type 'commonjs'

    import('node-mailjet').then(mailjetModule => {
        const mailjet = mailjetModule.default.Client.apiConnect('0cda9ddc947ed5d76fb907ba7b286e7f','ab335ec25f4fa8ba81817dee768b0f3f',{config:{},options:{}});
        const request = mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
              {
                From: {
                  Email: 'arjurek1029@gmail.com',
                  Name: 'Name',
                },
                To: [
                  {
                    Email: email,
                    Name: 'You',
                  },
                ],
                Subject: 'Game Invite Received!',
                TextPart:   `You've been invited to join a room! Click here to join: ${link}`,
                HTMLPart:
                `<p>You've been invited to join a room! Click <a href="${link}">here</a> to join.</p>`,
              },
            ],
          })
          request
            .then(result => {
              console.log(result.body)
            })
            .catch(err => {
              console.log(err.statusCode)
            })
    });
}