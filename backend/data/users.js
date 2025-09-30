import bcrypt from 'bcrypt';

const users = [
    {
        name:"Admin user",
        email:"admin@gmail.com",
        password:bcrypt.hashSync('1234567',10),
        
    },
    {
        name:"riyas",
        email:"sriyas150803@gmail.com",
        password:bcrypt.hashSync('123456',10),
        
    },
    {
        name:"mohamed",
        email:"riyas@gmail.com",
        password:bcrypt.hashSync('123456',10),
       
    }
]


export default users;