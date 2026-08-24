import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "https://www.bing.com/images/search?view=detailV2&ccid=hGSCbXlc&id=317D9F7971F27317249FEBCD1E8132C925837B61&thid=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&mediaurl=https%3a%2f%2fwww.pngmart.com%2ffiles%2f23%2fProfile-PNG-Photo.png&exph=2048&expw=2048&q=profile&FORM=IRPRST&ck=4BDF1503C9F51D7DFE6865BF623638F4&selectedIndex=0&itb=1" },
},
    {
        timestamps: true
    }
)

const User = mongoose.model("user" , UserSchema)
export default User