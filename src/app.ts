import { addKeyword, createBot, createFlow, createProvider, MemoryDB } from "@bot-whatsapp/bot"
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys"


const flowBienvenida= addKeyword('Hola').addAnswer('Buenas tardes, bienvenido a Techgans')


const main = async () => {
    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http!.server.post('/send-message', handleCtx(async(bot, req, res)=>{
        const body= req.body
        const message = body.message
        const mediaUrl = body.mediaUrl


        await bot.sendMessage('51957255145','test mensaje con adjunto',{media: mediaUrl})

        res.end('esto es el server de polka')
    })

    )

    await createBot({

        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider

    })
}


main()
