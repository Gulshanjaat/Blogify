const express = require("express")
const {
    addblog,
    getblog,
    add_cat,
    updateBlog,
    deleteBlog,
    getRelatedBlog,
    getSingleBlog,
    latestBlogs,
    searchBlog,
    getCategory,
    updateCategory,
    deleteCategory,
    dashboard,
} = require("../controlers/blogapi");
const upload = require("../utils/multer")
const addadmin = require("../controlers/adminapi")
const { sendemail, verifyotp } = require("../middlwares/adminaut")
const auth = require("../middlwares/auth");


const router = express.Router()


// router.post("/blog",upload.single("photo"),addblog)
// router.get("/blog",getblog)
// router.get("/relblog",getRelatedBlog)
// router.put("/blog/:_id",updateBlog)
// router.delete("/blog/:_id",deleteBlog)
router.post("/cat",add_cat)
router.post("/admin",addadmin)
router.post("/send",sendemail)
router.post("/veryfy",verifyotp)


router.post(
    "/blog",
    
    upload.single("photo"),
    addblog
);

router.put(
    "/blog/:_id",
    
    updateBlog
);

router.delete(
    "/blog/:_id",
    
    deleteBlog
);

router.get("/blog", getblog);

router.get("/blog/:id", getSingleBlog);

router.get("/latest", latestBlogs);

router.get("/search", searchBlog);

router.get("/category", getCategory);

router.get("/relblog/:id", getRelatedBlog);


router.put(
  "/category/:id",
  
  updateCategory
);

router.delete(
  "/category/:id",
 
  deleteCategory
);

router.get(
  "/dashboard",
  
  dashboard
);







module.exports = router