const express=require('express')
const router=express.Router()
const customercontroller=require('./Customer/customerController')
const farmers=require('./Farmer/farmerController')
const krishi=require('./krishiBhavan/krishiController')
const product=require('./Farmer/prodController')
const cart=require('./Customer/cartController')
const wishlist=require('./Customer/wishlistController')
const orders=require('./Customer/orderController')
const delivery=require('./DeliveryAgent/deliveryController')

//customer routes
router.post('/registerCustomer',customercontroller.registerCustomer)
router.post('/loginCustomer',customercontroller.loginCustomer)
router.post('/editCustomerById/:id',customercontroller.editCustomerById)
router.post('/viewAllCustomers',customercontroller.viewCustomers)
router.post('/viewCustomerById/:id',customercontroller.viewCustomerById)
router.post('/forgotpwdCustomer',customercontroller.forgotPwd)
router.post('/deleteCustomerById/:id',customercontroller.deleteCustomerById)

router.post('/addtoOrders',orders.addtoOrders)
router.post('/viewOrderByCustomerId/:id',orders.viewOrderByCustomerId)
router.post('/viewOrderById/:id',orders.viewOrderById)



//farmer routes
router.post('/registerFarmer',farmers.registerFarmer)
router.post('/loginFarmer',farmers.loginFarmer)
router.post('/editFarmerById/:id',farmers.editFarmerById)
router.post('/viewAllFarmers',farmers.viewFarmers)
router.post('/viewFarmerById/:id',farmers.viewFarmerById)
router.post('/deleteFarmerById/:id',farmers.deleteFarmerById)
router.post('/forgotPwdFarmer',farmers.forgotPwd)
router.post('/addComplaint',farmers.addComplaint)
router.post('/DeleteComplaintById/:id',farmers.DeleteComplaintById)

router.post('/viewGuidelines/:id',farmers.viewGuidelines)
router.post('/checkIdStatus/:id',farmers.viewFarmerIdCard)
router.post('/viewCompensation/:id',farmers.viewCompensation)
router.post('/viewallowances/:id',farmers.viewallowances)

router.post('/viewMyProductsByFarmerId/:id',farmers.viewMyProductsByFarmerId)
router.post('/viewMyOrdersByFarmId/:id',farmers.viewMyOrdersByFarmId)


 
//krishi routes
router.post('/registerkrishi',krishi.registerKBhavan)
router.post('/loginkrishi',krishi.loginKBhavan)
router.post('/editkrishiById/:id',krishi.editKBhavanById)
router.post('/viewAllkrishi',krishi.viewKBhavans)
router.post('/viewkrishiById/:id',krishi.viewKBhavanById)
router.post('/deletekrishiById/:id',krishi.deleteKBhavanById)
router.post('/forgotPwdkrishi',krishi.forgotPwd)
router.post('/approveFarmer/:id',krishi.Approvefarmer)
router.post('/viewFarmerReqs/:id',krishi.viewFarmerRequests)
router.post('/viewFarmerComplaints/:id',krishi.viewFarmerComplaints)
router.post('/addGuideline/:id',krishi.addGuideline)
router.post('/addAllowances',krishi.addAllowances)
router.post('/addCompensation/:id',krishi.addCompensation)


//product routes
router.post('/addProduct',product.upload,product.addproduct)
router.post('/editProductById/:id',product.upload,product.editproduct)
router.post('/viewAllProduct',product.displayproduct)
router.post('/viewProductById/:id',product.getproductbyid)
router.post('/deleteProductById/:id',product.deleteproduct)
router.post('/viewProductByFarmerId/:farm_id',product.displayproductByFarmId)
router.post('/addRating/:id',product.addRating)



//cart routes
router.post('/addCart',cart.addtocart)
router.post('/viewCarts',cart.viewcarts)
router.post('/viewCartById/:id',cart.getproductbyid)
router.post('/deleteCartById/:id',cart.deleteproduct)
router.post('/viewCartByUserId/:id',cart.getproductbyUserId)


//wishlist routes
router.post('/addTowishlist',wishlist.addtowishlist)
router.post('/viewwishlists',wishlist.viewcarts)
router.post('/viewwishlistById/:id',wishlist.getproductbyid)
router.post('/deletewishlistById/:id',wishlist.deleteproduct)
router.post('/viewwishlistByUserId/:id',wishlist.getproductbyUserId)

//delivery routes
router.post('/registerDriver',delivery.upload,delivery.registerDriver)
router.post('/editDriverById/:id',delivery.upload,delivery.editDriverById)
router.post('/viewDrivers',delivery.viewDrivers)
router.post('/viewDriverById/:id',delivery.viewDriverById)
router.post('/deleteDriverById/:id',delivery.deleteDriverById)
router.post('/loginDriver',delivery.loginDriver)
router.post('/acceptDriverById/:id',delivery.acceptDriverById)
router.post('/viewDriverReqs',delivery.viewDriverReqs)
router.post('/viewOrdersforDelivery',delivery.viewOrdersforDelivery)
router.post('/acceptorderbyDriverId/:id',delivery.acceptorderbyDriverId)
router.post('/updateStatusByDriverId',delivery.updateStatusByDriverId)

router.post('/viewOrdersbyDriverId/:id',delivery.viewOrdersbyDriverId)

module.exports=router
