const CONFIG = {
    MONGO_URL   : 'mongodb+srv://dbuser:abcd@mastercluster.usel1.mongodb.net/social-awarness-application?authSource=admin&replicaSet=atlas-pz7ayc-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
    MONGO_DB    : 'chatbotDB',
    PORT        :  process.env.PORT || 3000,
    apis        : {
        profileApis :
            {
                register    : `/register`,
                signin      : `/signin`,
                details     : `/details`
            },
        postApis    :
            {
                create      : `/create`,
                update      : `/update`,
                delete      : `/delete/:id`,
                getAll      : `/getAll`,
                getAllPending: `/getAllPending`,
                upvote      : `/upvote/:id`,
                approve     : `/approve/:id`
            },
        commentApis :
        {
                add         : `/add`,
                getAll      : `/getAll/:postId`
        }
        
    }
}

module.exports = CONFIG