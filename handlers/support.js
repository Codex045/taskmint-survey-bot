export default function support(bot) {

    bot.hears("📞 Support", async (ctx) => {

        await ctx.reply(
`📞 TaskMint Support

Need help?

• Survey issues
• Withdrawal issues
• Account problems

Contact Admin:
@Glad_Robert

We usually reply within 24 hours.`
        );

    });

}
