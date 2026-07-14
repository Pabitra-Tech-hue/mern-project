
import mongoose, {Document} from "mongoose";
enum Role{
    USER="USER",
    ADMIN="ADMIN",
}
// *user interface
interface IUser extends Document{
    full_name:string;
    email:string;
    password:string;
    profile_image?:string;
    Role:Role;
}
// *schema
const userSchema=new mongoose.Schema <IUser>({
    full_name:{
        type:String,
        required:[true, "full_name is required"],
        minlength:[3, "name must be 3 characters long."],



    },

    email:{
        type:String,
        required:[true, "email is required"],
        unique:[true, "user already exists with provided email"],
    
        trim:true,
    },
    password:{
        type:String,
        default:null,
        select:false,
    },
    Role:{
        type:String,
        enum:Object.values(Role),
        default:Role.USER,
    },
    profile_image:{
        type:String,
        default:null,
    }
},{timestamps:true});


// *model
const User=mongoose.model("user", userSchema);

export default User;