let apiUrl = "http://localhost/ITS_Food_Backend/admin/api/";
console.log("Done");

// vendor crud
function handleVendor(e) {
  e.preventDefault();
  let formData = new FormData();

  formData.append("type", "handleVendor");
  formData.append("resturantData", $("#resturantData").val());
  formData.append("ownerName", $("#ownerName").val());
  formData.append("email", $("#email").val());
  formData.append("phone", $("#phone").val());
  formData.append("password", $("#password").val());
  formData.append("bankName", $("#bankName").val());
  formData.append("accountNumber", $("#accountNumber").val());
  formData.append("ifscCode", $("#ifscCode").val());
  formData.append("upiId", $("#upiId").val());
  formData.append("gstNumber", $("#gstNumber").val());
  formData.append("panNumber", $("#panNumber").val());

  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: formData,
    success: function (response) {
      if (response.status == "success") {
        console.log(response.message);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}
function getVendor() {
  //code
}
function editVendor() {
  //code
}
function updateVendor() {
  //code
}
function deleteVendor() {
  //code
}

// resturants crud
function handleResturant(e) {
  e.preventDefault();

  let formData = new FormData();

  formData.append("type", "handleResturant");

  formData.append("restaurantName", $("#restaurantName").val());
  formData.append("restaurantSlug", $("#restaurantSlug").val());
  formData.append("restaurantDescription", $("#restaurantDescription").val());
  formData.append("restaurantLogo", $("#restaurantLogo")[0].files[0]);
  formData.append("coverImage", $("#coverImage")[0].files[0]);
  formData.append("restaurantPhone", $("#restaurantPhone").val());
  formData.append("restaurantEmail", $("#restaurantEmail").val());
  formData.append("restaurantAddress", $("#restaurantAddress").val());
  formData.append("restaurantCity", $("#restaurantCity").val());
  formData.append("restaurantState", $("#restaurantState").val());
  formData.append("restaurantPincode", $("#restaurantPincode").val());
  formData.append("openingTime", $("#openingTime").val());
  formData.append("closingTime", $("#closingTime").val());
  formData.append("minimumOrderAmount", $("#minimumOrderAmount").val());
  formData.append("deliveryCharge", $("#deliveryCharge").val());
  formData.append("commissionPercent", $("#commissionPercent").val());
  formData.append("avgRating", $("#avgRating").val());
  formData.append("totalReviews", $("#totalReviews").val());

  $.ajax({
    url: apiUrl,
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response.status == "success") {
        console.log(response.message);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}
function getResturant() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getResturant",
    },
    success: function (response) {
      console.log(response);
      if (response.status == "success") {
        console.log(response.message);

        let resturantHtml = '<option value="">Select Resturant</option>';
        response.data.map((item) => {
          resturantHtml += ` <option value="${item.id}">${item.name}</option>`;
        });
        $("#resturantData").append(resturantHtml);
        $("#productResturant").append(resturantHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Err : " + error);
    },
  });
}
function editResturant() {
  //code
}
function updateResturant() {
  //code
}
function deleteResturant() {
  //code
}

// category crud
function handleCategory(e) {
  e.preventDefault();

  const formData = new FormData();

  formData.append("type", "handleCategory");
  formData.append("categoryName", $("#categoryName").val());
  formData.append("categoryBanner", $("#categoryBanner")[0].files[0]);
  formData.append("categoryImage", $("#categoryImage")[0].files[0]);

  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: formData,
    success: function (response) {
      if (response.status == "success") {
        console.log(response.message);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}
function getCategory() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getCategory",
    },
    success: function (response) {
      console.log(response);
      if (response.status == "success") {
        console.log(response.message);

        let categoryHtml = '<option value="">Select Category</option>';
        response.data.map((item) => {
          categoryHtml += ` <option value="${item.id}">${item.name}</option>`;
        });
        $("#productCategory").append(categoryHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Err : " + error);
    },
  });
}

function editCategory() {
  //code
}
function updateCategory() {
  //code
}
function deleteCategory() {
  //code
}

// Coupons crud
function handleCoupon(e) {
  e.preventDefault();

  let formData = new FormData();

  formData.append("type", "handleCoupon");
  formData.append("couponCode", $("#couponCode").val());
  formData.append("discountType", $("#discountType").val());
  formData.append("discountValue", $("#discountValue").val());
  formData.append("minimumOrderAmount", $("#minimumOrderAmount").val());
  formData.append("maxDiscountAmount", $("#maxDiscountAmount").val());
  formData.append("startDate", $("#startDate").val());
  formData.append("endDate", $("#endDate").val());
  formData.append("usageLimit", $("#usageLimit").val());
  formData.append("usedCount", $("#usedCount").val());

  $.ajax({
    url: apiUrl,
    type: "POST",
    data: formData,
    success: function (response) {
      if (response.status == "success") {
        console.log(response.message);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}
function editCategory() {
  //code
}
function updateCategory() {
  //code
}
function deleteCategory() {
  //code
}

// food crud

function handleProduct(e) {
  e.preventDefault();

  let formData = new FormData();

  formData.append("type", "handleProduct");
  formData.append("productName", $("#productName").val());
  formData.append("productFoodType", $("#productFoodType").val());
  formData.append("productPrice", $("#productPrice").val());
  formData.append("productSellingPrice", $("#productSellingPrice").val());
  formData.append("productPreparationTime", $("#productPreparationTime").val());
  formData.append("productCalories", $("#productCalories").val());
  formData.append("productResturant", $("#productResturant").val());
  formData.append("productCategory", $("#productCategory").val());
  formData.append("productImage", $("#productImage")[0].files[0]);
  formData.append("productDescription", $("#productDescription").val());

  $.ajax({
    url: apiUrl,
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response.status == "success") {
        console.log(response.message);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}
