const userSchema=new mongoose.Schema({
    username: string, 
    password: string
});

  const Post = mongoose.model('Post', postSchema);
  const User = mongoose.model('User', userSchema);
  
module.exports = {Post, User}

