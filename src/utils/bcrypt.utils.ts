import bcrypt from "bcrypt";


// hash password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};


//*compare password
export const comparePassword= async (password:string,hash:string):Promise<boolean>=>{
    try {
        return await bcrypt.compare (password,hash)
    }catch(error){
        console.log(error);
        throw new Error("something went wrong");
    }
};