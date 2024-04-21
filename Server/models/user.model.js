import mongoose from "mongoose";

//schema or format/structure of database models
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://imgs.search.brave.com/KRNX7dwzVhXFh-Zl4_mug5tAf4xb9Nmhn9mJOvt2m_M/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/d2luaGVscG9ubGlu/ZS5jb20vYmxvZy93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNy8x/Mi91c2VyLnBuZw",
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
