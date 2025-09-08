const getCourse = (req, res)=>{
    res.status(200).json({success: true, message: "Welcome to course page."})
}

module.exports={
    getCourse
}