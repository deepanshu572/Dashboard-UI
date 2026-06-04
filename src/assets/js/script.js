let apiUrl = "http://localhost/ITS_Food_Backend/admin/api/";
let imgUrl = "http://localhost/ITS_Food_Backend/admin/";
console.log("Done");
const adminId = localStorage.getItem("adminId");
const adminRole = localStorage.getItem("adminRole");
if(adminRole[0]){
  $('.circle').html(adminRole[0])
}
if (!adminId) {
    window.location.href = "signin.html";
}


function dashboardCount(){
  $.ajax({
    url:apiUrl,
    method:"POST",
    dataType:"JSON",
    data:{
      type:"dashboardCount"
    },
    success: function (response) {
      if(response.status == "success"){
        console.log(response.data);
        $("#userCount").html(response.data.users)
        $("#orderCount").html(response.data.orders)
        $("#categoryCount").html(response.data.categories)
        $("#foodCount").html(response.data.products)
      }
      else{
        console.log(response.message);
      }
    }
  })
}


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
        alert(response.message);
        $("#addVendorForm")[0].reset();
      } else {
        alert(response.message);
      }
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}
function getVendor() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getVendor",
    },
    success: function (response) {
      console.log(response);
      if (response.status == "success") {
        console.log(response.message);

        let vendorHtml = "";
        let i = 0;
        response.data.map((item) => {
          $("#restaurantId").val(item.restaurant_id);
          i++;

          vendorHtml += `  <tr class="align-middle " >

            <td>${i}</td>
            <td>${item.restaurant_name}</td>
            <td>${item.owner_name}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.password}</td>
            <td>${item.bank_name}</td>
            <td>${item.account_number}</td>
            <td> <span class="badge ${item.status === 'active' ? 'approved':'reject'} ">
            ${item.status}
        </span></td>

           
                 <td>
    <div class="action-buttons">

        <a data-bs-toggle="modal"  onclick='actionVendor(${JSON.stringify(item)}, "view")' data-bs-target="#exampleModal" href="#" class="action-btn view-btn">
            <i class="ti ti-eye"></i>
        </a>

        <a data-bs-toggle="modal" onclick='actionVendor(${JSON.stringify(item)}, "edit")' data-bs-target="#addVendorModal" href="#" class="action-btn edit-btn">
            <i class="ti ti-edit"></i>
        </a>

        <a href="#" onclick='deleteVendor(${JSON.stringify(item)},"${item.status}")' class="action-btn ${item.status === 'active' ? 'view-btn':'reject'}">
           ${item.status === 'active'
    ? '<i class="ti ti-lock-open"></i>'
    : item.status === 'blocked'
        ? '<i class="ti ti-ban"></i>'
        : '<i class="ti ti-lock"></i>'
}
            </a>

    </div>
</td> 
            </tr>`;
        });

        $("#vendorData").html(vendorHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Err : " + error);
    },
  });
}

function actionVendor(data, type) {
  if (type == "edit") {
    $("#idHold").val(data.id);
    $("#restaurantName").val(data.restaurant_name);
    $("#ownerName").val(data.owner_name);
    $("#email").val(data.email);
    $("#phone").val(data.phone);
    $("#password").val(data.password);
    $("#bankName").val(data.bank_name);
    $("#accountNumber").val(data.account_number);
    $("#ifscCode").val(data.ifsc_code);
    $("#upiId").val(data.upi_id);
    $("#gstNumber").val(data.gst_number);
    $("#panNumber").val(data.pan_number);
    $("#statusEd").val(data.status);
  } else {
    let avatar = data.owner_name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
    $("#avatar").html(avatar);
    $("#nameTop").html(data.owner_name);
    $("#emailView").html(data.email || "-");
    $("#phoneView").html(data.phone || "-");
    $("#shopNameView").html(data.restaurant_name || "-");
    $("#resturantView").html(data.restaurant_name || "-");
    $("#bankView").html(data.bank_name || "-");
    $("#accountView").html(data.account_number || "-");
    $("#ifcsView").html(data.ifsc_code || "-");
    $("#upiIdView").html(data.upi_id || "-");
    $("#gstView").html(data.gst_number || "-");
    $("#panView").html(data.pan_number || "-");
    $("#createdView").html(data.created_at || "-");
  }
}

function updateVendor(e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append("type", "updateVendor");
  formData.append("id", $("#idHold").val());
  formData.append("rid", $("#restaurantId").val());
  formData.append("owner_name", $("#ownerName").val());
  formData.append("email", $("#email").val());
  formData.append("phone", $("#phone").val());
  formData.append("password", $("#password").val());
  formData.append("bank_name", $("#bankName").val());
  formData.append("account_number", $("#accountNumber").val());
  formData.append("ifsc_code", $("#ifscCode").val());
  formData.append("upi_id", $("#upiId").val());
  formData.append("gst_number", $("#gstNumber").val());
  formData.append("pan_number", $("#panNumber").val());
  formData.append("status", $("#statusEd").val());
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: formData,
    success: function (response) {
      if (response.status == "success") {
        $("#addVendorForm")[0].reset();
        $("#addVendorModal").modal("hide");
        getVendor();
        alert(response.message);
      } else {
        alert(response.message);
      }
    },
  });
}

$("#resturantData").on("change", function () {
  let name = $(this).find("option:selected").text();
  $("#restaurantName").val(name);
  $("#restaurantId").val($(this).val());
});

function deleteVendor(data,status) {
  console.log(status);
 if (status == "active") {
    status = "inactive";
    if (!confirm("Are you sure you want to deactivate this vendor?")) return;
} else {
    status = "active";
    if (!confirm("Are you sure you want to activate this vendor?")) return;
}
  console.log(status);
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "deleteVendor",
      id: data.id,
      status
    },
    success: function (response) {
      if (response.status == "success") {
        alert(response.message);
        getVendor();
      } else {
        console.log(response.message);
      }
    },
  });
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
      $("#addResturantForm")[0].reset();
        alert(response.message);
       
      } else {
        alert(response.message);
      }
    },
    error: function (xhr, status, error) {
      alert(error);
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
        let i = 0;

        let resturantHtml = '<option value="">Select Resturant</option>';
        let resturantTableHtml = "";
        response.data.map((item) => {
          i++;
          resturantHtml += ` <option value="${item.id}">${item.name}</option>`;

          resturantTableHtml += `  <tr class="align-middle " >

           <td>${i}</td>
          <td>${item.name}</td>
          <td>${item.address}</td>
          <td>${item.email}</td>
          <td>${item.phone}</td>
          <td>${item.city}</td>
          <td>${item.state}</td>
          <td>${item.pincode}</td>
          <td><span class="  ${item.status == "approved" && "approved"}  ${item.status == "pending" && "pending"}  ${item.status == "rejected" && "reject"} ${item.status == "blocked" && "blocked"} badge">
            ${item.status}
        </span></td>

           
        
                 <td>
         <div class="action-buttons">

        <a data-bs-toggle="modal"  onclick='actionResturant(${JSON.stringify(item)}, "view")'  data-bs-target="#ResturantViewModal" href="#" class="action-btn view-btn">
            <i class="ti ti-eye"></i>
        </a>

        <a data-bs-toggle="modal"  onclick='actionResturant(${JSON.stringify(item)}, "edit")' data-bs-target="#editResturantModal" href="#" class="action-btn edit-btn">
            <i class="ti ti-edit"></i>
        </a>

        

          </div>
      </td> 
            </tr>`;
        });

        $("#resturantData").append(resturantHtml);
        $("#productResturant").append(resturantHtml);
        $("#resturantDataTable").html(resturantTableHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Err : " + error);
    },
  });
}
function actionResturant(data, type) {
  if (type == "edit") {
    $("#idHoldEd").val(data.id);
    $("#nameEd").val(data.name);
    $("#emailEd").val(data.email);
    $("#phoneEd").val(data.phone);
    $("#addressEd").val(data.address);
    $("#cityEd").val(data.city);
    $("#stateEd").val(data.state);
    $("#pincodeEd").val(data.pincode);
    $("#minimum_order_amountEd").val(data.minimum_order_amount);
    $("#delivery_chargeEd").val(data.delivery_charge);
    $("#commission_percentEd").val(data.commission_percent);
    $("#statusEd").val(data.status);
    $("#is_openEd").val(data.is_open);
    $("#openingTime").val(data.opening_time);
    $("#deliveryCharge").val(data.delivery_charge);
    $("#closingTime").val(data.closing_time);
    $("#coverImage").val(data.cover_image);
    $("#restaurantLogo").val(data.logo);
    
  } else {
    $("#id").html(data.id || "-");
    $("#name").html(data.name || "-");
    $("#slug").html(data.slug || "-");
    $("#description").html(data.description || "-");
    $("#logo").attr("src", imgUrl + data.logo || "-");
    $("#cover_image").attr("src", imgUrl + data.cover_image || "-");
    $("#phone").html(data.phone || "-");
    $("#email").html(data.email || "-");
    $("#address").html(data.address || "-");
    $("#city").html(data.city || "-");
    $("#state").html(data.state || "-");
    $("#pincode").html(data.pincode || "-");
    $("#latitude").html(data.latitude || "-");
    $("#longitude").html(data.longitude || "-");
    $("#opening_time").html(data.opening_time || "-");
    $("#closing_time").html(data.closing_time || "-");
    $("#minimum_order_amount").html(data.minimum_order_amount || "-");
    $("#delivery_charge").html(data.delivery_charge || "-");
    $("#commission_percent").html(data.commission_percent || "-");
    $("#avg_rating").html(data.avg_rating || "-");
    $("#total_reviews").html(data.total_reviews || "-");
    $("#is_open").html(data.is_open == "1" ? "Open" : "Closed");
    $("#status").html(data.status || "-");
    $("#created_at").html(data.created_at || "-");
    $("#updated_at").html(data.updated_at || "-");
  }
}
function updateResturant(e) {
  e.preventDefault();
  const formData = new FormData();

  formData.append("type", "updateResturant");
  formData.append("id", $("#idHoldEd").val());
  formData.append("name", $("#nameEd").val());
  formData.append("email", $("#emailEd").val());
  formData.append("phone", $("#phoneEd").val());
  formData.append("address", $("#addressEd").val());
  formData.append("city", $("#cityEd").val());
  formData.append("state", $("#stateEd").val());
  formData.append("pincode", $("#pincodeEd").val());
  formData.append("minimum_order_amount", $("#minimum_order_amountEd").val());
  formData.append("delivery_charge", $("#delivery_chargeEd").val());
  formData.append("commission_percent", $("#commission_percentEd").val());
  formData.append("status", $("#statusEd").val());
  formData.append("is_open", $("#is_openEd").val());
  formData.append("restaurantLogo", $("#restaurantLogo")[0].files[0]);
  formData.append("coverImage", $("#coverImage")[0].files[0]);
   formData.append("openingTime", $("#openingTime").val());
  formData.append("closingTime", $("#closingTime").val());

  $.ajax({
    url: apiUrl,
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response.status == "success") {
        alert(response.message);
        $("#restaurantForm")[0].reset();
        $("#editResturantModal").modal("hide");
        getResturant();
      } else {
        alert(response.message);
      }
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}
// function deleteResturant(data,status) {

//    console.log(status);
//  if (status == "pending") {
//     status = "blocked";
//     if (!confirm("Are you sure you want to deactivate this Resturant?")) return;
// } else {
//     status = "pending";
//     if (!confirm("Are you sure you want to activate this Resturant?")) return;
// }
//   console.log(status);
//   // $.ajax({
//   //   url: apiUrl,
//   //   method: "POST",
//   //   dataType: "JSON",
//   //   data: {
//   //     type: "deleteResturant",
//   //     id: data.id,
//   //     status:status
//   //   },
//   //   success: function (response) {
//   //     if (response.status == "success") {
//   //       alert(response.message);
//   //       console.log(response);
//   //       getResturant();
//   //     } else {
//   //       console.log(response.message);
//   //     }
//   //   },
//   // });
// }

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
       alert(response.message);
      } else {
       alert(response.message);
      }
    },
    error: function (xhr, status, error) {
     alert(error);
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
        let i = 0;
        let categoryHtml = '<option value="">Select Category</option>';
        let categoryTableHtml = "";
        response.data.map((item) => {
          i++;
          categoryHtml += ` <option value="${item.id}">${item.name}</option>`;
          categoryTableHtml += `
<tr class="align-middle">

    <td>${i}</td>

    <td>${item.name}</td>

    <td>
        <img src="${imgUrl + item.image}" 
             style="width:50px;height:50px;border-radius:8px;object-fit:cover;">
    </td>

    <td>
        <img src="${imgUrl + item.cover_image}" 
             style="width:90px;height:50px;border-radius:8px;object-fit:cover;">
    </td>

    <td>${item.sort_order}</td>

    <td>
        <span class="badge ${item.status === 'active' ? 'approved':'reject'}">
            ${item.status}
        </span>
    </td>

    <td>${item.created_at}</td>

    <td>
        <div class="action-buttons">

            <a data-bs-toggle="modal"  onclick='actionCategory(${JSON.stringify(item)}, "view")' data-bs-target="#CategoryViewModal"
               href="#" class="action-btn view-btn">
                <i class="ti ti-eye"></i>
            </a>

            <a data-bs-toggle="modal"  onclick='actionCategory(${JSON.stringify(item)}, "edit")' data-bs-target="#editCategoryModal"
               href="#" class="action-btn edit-btn">
                <i class="ti ti-edit"></i>
            </a>

            <a href="#" onclick='deleteCategory(${JSON.stringify(item)},"${item.status}")' class="action-btn ${item.status === 'active' ? 'view-btn':'reject'}">
             ${item.status === 'active'
    ? '<i class="ti ti-lock-open"></i>'
    : '<i class="ti ti-lock"></i>'
}
            </a>

        </div>
    </td>

</tr>`;
        });
        $("#CategoryDataTable").html(categoryTableHtml);
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
function actionCategory(data, type) {
  if (type == "edit") {
    $("#idCatEd").val(data.id);
    $("#categoryNameEd").val(data.name);
    $("#sortOrderEd").val(data.sort_order);
    $("#statusEd").val(data.status);
    $("#imageEd").val(data.image);
    $("#coverImgEd").val(data.cover_image);
  } else {
    $(".catNameView").html(data.name);
    $("#sortView").html(data.sort_order);
    $(".activeCategory").html(data.status);
    $("#imageView").attr("src", imgUrl + data.image);
    $("#coverImgView").attr("src", imgUrl + data.cover_image);
  }
}

function updateCategory(e) {
  e.preventDefault();
  const formData = new FormData();

  formData.append("type", "updateCategory");
  formData.append("id", $("#idCatEd").val());
  formData.append("name", $("#categoryNameEd").val());
  formData.append("sort_order", $("#sortOrderEd").val());
  formData.append("status", $("#statusEd").val());
  formData.append("image", $("#imageEd")[0].files[0]);
  formData.append(
    "cover_image",
     $("#coverImgEd")[0].files[0],
  );
  $.ajax({
    url: apiUrl,
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response.status == "success") {
        alert(response.message);
        $("#categoryForm")[0].reset();
        $("#editCategoryModal").modal("hide");
        getCategory();
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}
function deleteCategory(item,status) {
 console.log(status);
 if (status == "active") {
    status = "inactive";
    if (!confirm("Are you sure you want to deactivate this category?")) return;
} else {
    status = "active";
    if (!confirm("Are you sure you want to activate this category?")) return;
}
  console.log(status);
  
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "deleteCategory",
      id: item.id,
      status
    },
    success: function (response) {
      if (response.status == "success") {
        alert(response.message);
        getCategory();
      } else {
        alert(response.message);
      }
    },
  });
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
        alert(response.message);
        $("#addCouponsForm")[0].reset();
      } else {
        alert(response.message);
      }
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}
function getCoupons() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getCoupons",
    },
    success: function (response) {
      console.log(response);
      if (response.status == "success") {
        console.log(response.message);
        let i = 0;
        let couponTableHtml = "";
        response.data.map((item) => {
          i++;
          couponTableHtml += `
        <tr>
            <td>${i}</td>
            <td>${item.code}</td>
            <td>${item.discount_type}</td>
            <td>₹${item.discount_value}</td>
            <td>${item.start_date}</td>
            <td>${item.end_date}</td>
            <td>
                <span class="status-badge ${item.status}">
                    ${item.status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    

                    <a data-bs-toggle="modal"
                      data-bs-target="#viewCouponModal"
                      onclick='actionCoupon(${JSON.stringify(item)}, "view")'
                      href="#"
                      class="action-btn view-btn">
                        <i class="ti ti-eye"></i>
                    </a>
                    <a data-bs-toggle="modal"
                      data-bs-target="#editCouponModal"
                      onclick='actionCoupon(${JSON.stringify(item)}, "edit")'
                      href="#"
                      class="action-btn edit-btn">
                        <i class="ti ti-edit"></i>
                    </a>
                     <a href="#" onclick='deleteCoupon(${JSON.stringify(item)})' class="action-btn delete-btn">
                <i class="ti ti-trash"></i>
            </a>
                </div>
            </td>
        </tr>
        `;
        });
        $("#CouponDataTable").html(couponTableHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Err : " + error);
    },
  });
}
function actionCoupon(item, type) {
  if (type == "edit") {
    $("#couponIdEd").val(item.id);

    $("#couponCodeEd").val(item.code);

    $("#discountTypeEd").val(item.discount_type);

    $("#discountValueEd").val(item.discount_value);

    $("#minimumOrderEd").val(item.minimum_order_amount);

    $("#maxDiscountEd").val(item.max_discount_amount);

    $("#startDateEd").val(item.start_date.split(" ")[0]);

    $("#endDateEd").val(item.end_date.split(" ")[0]);

    $("#usageLimitEd").val(item.usage_limit);

    $("#usedCountEd").val(item.used_count);

    $("#statusEd").val(item.status);
  } else {
    $("#couponCodeView").html(item.code);
    $("#couponCodeView2").html(item.code);

    $("#couponStatusTop").html(item.status);
    $("#couponStatusBadge").html(item.status);
    $("#statusView").html(item.status);

    $("#discountTypeView").html(item.discount_type);
    $("#discountValueView").html("₹" + item.discount_value);

    $("#minimumOrderView").html("₹" + item.minimum_order_amount);
    $("#maxDiscountView").html("₹" + item.max_discount_amount);

    $("#startDateView").html(item.start_date);
    $("#endDateView").html(item.end_date);

    $("#usageLimitView").html(item.usage_limit);
    $("#usedCountView").html(item.used_count);
  }
}
function updateCoupon(e) {
  e.preventDefault();
  const formData = new FormData();

  formData.append("type", "updateCoupon");
  formData.append("id", $("#couponIdEd").val());

  formData.append("code", $("#couponCodeEd").val());

  formData.append("discount_type", $("#discountTypeEd").val());

  formData.append("discount_value", $("#discountValueEd").val());

  formData.append("minimum_order_amount", $("#minimumOrderAmountEd").val());

  formData.append("max_discount_amount", $("#maxDiscountAmountEd").val());

  formData.append("usage_limit", $("#usageLimitEd").val());

  formData.append("used_count", $("#usedCountEd").val());

  formData.append("status", $("#statusEd").val());

  formData.append("start_date", $("#startDateEd").val());

  formData.append("end_date", $("#endDateEd").val());

  $.ajax({
    url: apiUrl,
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response.status == "success") {
        alert(response.message);
        $("#couponForm")[0].reset();
        $("#editCouponModal").modal("hide");
        getCoupons();
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}
function deleteCoupon(item) {
  if (!confirm("You want to delete this coupons ? ")) return;
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "deleteCoupon",
      id: item.id,
    },
    success: function (response) {
      if (response.status == "success") {
        alert(response.message);
        getCoupons();
      } else {
        alert(response.message);
      }
    },
  });
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
        alert(response.message);
         $("#addProductForm")[0].reset();
      } else {
        alert(response.message);
      }
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}
function getFoods() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getFoods",
    },
    success: function (response) {
      console.log(response);
      if (response.status == "success") {
        console.log(response.message);
        let i = 0;
        let foodTableHtml = "";
        response.data.map((item) => {
          i++;
          foodTableHtml += `
        <tr>
            <td>${i}</td>

            <td>
                <img src="${imgUrl + item.image}"
                     alt="${item.name}"
                     width="50"
                     height="50"
                     style="object-fit:cover;border-radius:8px;">
            </td>

            <td>${item.name}</td>

            <td>${item.restaurant_name}</td>

            <td>${item.category_name}</td>

          

            <td>₹${item.base_price}</td>

            <td>₹${item.discount_price}</td>

            <td>${item.preparation_time} Min</td>


          



            <td>
                <span class="badge ${item.status === "active" ? "approved" : "reject"}">
                    ${item.status}
                </span>
            </td>


           <td>
                <div class="action-buttons">
                    

                    <a data-bs-toggle="modal"
                      data-bs-target="#viewFoodModal"
                      onclick='actionFood(${JSON.stringify(item)}, "view")'
                      href="#"
                      class="action-btn view-btn">
                        <i class="ti ti-eye"></i>
                    </a>
                    <a data-bs-toggle="modal"
                      data-bs-target="#editFoodModal"
                      onclick='actionFood(${JSON.stringify(item)}, "edit")'
                      href="#"
                      class="action-btn edit-btn">
                        <i class="ti ti-edit"></i>
                    </a>
                     <a href="#" data-bs-toggle="modal"
                      data-bs-target="#AddVarientModal"
                      onclick='getFoodVarients(${item.id})'
                      class="action-btn view-btn">
                <i class="ti ti-plus"></i>
            </a>
                </div>
            </td>
        </tr>
    `;
        });
        $("#FoodDataTable").html(foodTableHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Err : " + error);
    },
  });
}
function getFoodVarients(id) {
  console.log(id)
  $("#foodItemId").val(id);
  $("#changeBtn").html(` <button type="submit"
                        onclick="addVariant(event); return false;"
                                class="btn-save">
                            Add Varient
                        </button>`);
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getFoodVarients",
      id,
    },
    success: function (response) {
      if (response.status == "success") {
        console.log(response.message);
        let i = 0;
        let FoodVarientHtml = "";
        response.data.map((item) => {
          i++;
          FoodVarientHtml += `<tr>
                <th>${i}</th>
                <th>${item.variant_name}</th>
                <th>${item.price}</th>
                <th>
                 <div class="action-buttons">  
                    <a 
                      onclick='editFoodVarient(${JSON.stringify(item)})'
                      href="#"
                      class="action-btn edit-btn">
                        <i class="ti ti-edit"></i>
                    </a>
                     <a href="#" onclick='deleteVarient(${JSON.stringify(item)})' class="action-btn delete-btn">
                <i class="ti ti-trash"></i>
            </a>
                </div></th>
                </tr>`;
               
        });
       
           
        $("#variantTableBody").html(FoodVarientHtml);
      } else {
        let FoodVarientHtml = "";
        console.log(response.message);
        FoodVarientHtml += `<div class="flex_wrap">${response.message || "not found !"}</div>`;
        $("#variantTableBody").html(FoodVarientHtml);
      }
    },
  });
}
function actionFood(data, type) {
  const item = typeof data === "string" ? JSON.parse(data) : data;

  if (type === "view") {
    $("#foodNameView").html(item.name);
    $("#foodNameView2").html(item.name);

    $("#foodTypeView").html(item.food_type);
    $("#restaurantIdView").html(item.restaurant_id);
    $("#categoryIdView").html(item.category_id);

    $("#descriptionView").html(item.description);

    $("#basePriceView").html("₹" + item.base_price);
    $("#discountPriceView").html("₹" + item.discount_price);

    $("#preparationTimeView").html(item.preparation_time + " Min");
    $("#caloriesView").html(item.calories + " Cal");

    $("#recommendedView").html(item.is_recommended == 1 ? "Yes" : "No");

    $("#availableView").html(
      item.is_available == 1 ? "Available" : "Unavailable",
    );

    $("#statusView").html(item.status);

    $("#imageView").attr("src", imgUrl + item.image);

    $("#createdAtView").html(item.created_at);
    $("#updatedAtView").html(item.updated_at);
  } else if (type === "edit") {
    $("#foodIdEd").val(item.id);

    $("#restaurantIdEd").val(item.restaurant_id);

    $("#categoryIdEd").val(item.category_id);

    $("#foodNameEd").val(item.name);

    $("#descriptionEd").val(item.description);

    $("#foodTypeEd").val(item.food_type);

    $("#basePriceEd").val(item.base_price);

    $("#discountPriceEd").val(item.discount_price);

    $("#preparationTimeEd").val(item.preparation_time);

    $("#caloriesEd").val(item.calories);

    $("#recommendedEd").val(item.is_recommended);

    $("#availableEd").val(item.is_available);

    $("#statusEd").val(item.status);

    $("#previewImageEd").attr("src", imgUrl + item.image);
  }
}
function editFoodVarient(item){
  $("#variantName").val(item.variant_name)
  $("#variantPrice").val(item.price)
$("#changeBtn").html(`
    <button
        type="submit"
        onclick="updateVarient(event, ${item.id}); return false;"
        class="btn-save">
        Update Variant
    </button>
`);

}
function addVariant() {
  let id = $("#foodItemId").val();
  let price = $("#variantPrice").val();
  let name = $("#variantName").val();

  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "addVariant",
      id,
      name,
      price,
    },
    success: function (response) {
      if (response.status == "success") {
        alert(response.message);
        $("#variantForm")[0].reset();
        getFoodVarients(id);
      } else {
        alert(response.message);
      }
    },
  });
}
function updateVarient(e,varid) {
  e.preventDefault();
  console.log(varid)
  let vid = varid;
  let id = $("#foodItemId").val();
  let price = $("#variantPrice").val();
  let name = $("#variantName").val();

  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "updateVarient",
      vid,
      name,
      price,
    },
    success: function (response) {
      if (response.status == "success") {
        alert(response.message);
        $("#variantForm")[0].reset();
        getFoodVarients(id);
      } else {
        alert(response.message);
      }
    },
  });
}
function updateFood(e) {
  e.preventDefault();

const formData = new FormData();

formData.append("type", "updateFood");

formData.append("id", $("#foodIdEd").val());
formData.append("restaurant_id", $("#restaurantIdEd").val());
formData.append("category_id", $("#categoryIdEd").val());
formData.append("food_name", $("#foodNameEd").val());
formData.append("food_type", $("#foodTypeEd").val());
formData.append("description", $("#descriptionEd").val());
formData.append("base_price", $("#basePriceEd").val());
formData.append("discount_price", $("#discountPriceEd").val());
formData.append("preparation_time", $("#preparationTimeEd").val());
formData.append("calories", $("#caloriesEd").val());
formData.append("recommended", $("#recommendedEd").val());
formData.append("available", $("#availableEd").val());
formData.append("status", $("#statusEd").val());
const image = $("#foodImageEd")[0].files[0];

if(image){
    formData.append("food_image", image);
}
  $.ajax({
    url: apiUrl,
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response.status == "success") {
        alert(response.message);
         getFoods();
        $("#foodEditForm")[0].reset();
        $("#editFoodModal").modal("hide");
       
      } else {
        alert(response.message);
      }
    },
    error: function (xhr, status, error) {
      alert(error);
    },
  });
}
function deleteVarient(item) {
  if (!confirm("You want to delete this varient ? ")) return;
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "deleteVarient",
      id: item.id,
    },
    success: function (response) {
      if (response.status == "success") {
        alert(response.message);
        getFoodVarients(item.food_item_id);
      } else {
        alert(response.message);
      }
    },
  });
}

//order
function getOrders() {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getOrders",
    },
    success: function (response) {
      console.log(response);
      if (response.status == "success") {
        console.log(response.message);
        let i = 0;
        let orderTableHtml = "";
        response.data.map((item) => {
          i++;
          orderTableHtml += `<tr>
    <td>${item.id}</td>
    <td>${item.order_number}</td>
    
    <td>₹${item.delivery_charge}</td>
    <td>₹${item.discount_amount}</td>
    <td>₹${item.grand_total}</td>
    <td>${item.payment_method}</td>
    <td>
       <span class="status-badge badge ${item.payment_status}">
    ${item.payment_status}
</span>
    </td>
    <td>
        <span class="status-badge ${item.order_status}" id="ord${item.id}">
            ${item.order_status}
        </span>
    </td>
    <td>
     <select class="form-select order_update"
        onchange="updateOrderStatus(this)"
        data-id="${item.id}"
        id="orderUpdate">

    <option value="placed" ${item.order_status === 'placed' ? 'selected' : ''}>placed</option>
    <option value="accepted" ${item.order_status === 'accepted' ? 'selected' : ''}>accepted</option>
    <option value="preparing" ${item.order_status === 'preparing' ? 'selected' : ''}>preparing</option>
    <option value="picked_up" ${item.order_status === 'picked_up' ? 'selected' : ''}>picked_up</option>
    <option value="out_for_delivery" ${item.order_status === 'out_for_delivery' ? 'selected' : ''}>out_for_delivery</option>
    <option value="delivered" ${item.order_status === 'delivered' ? 'selected' : ''}>delivered</option>
    <option value="cancelled" ${item.order_status === 'cancelled' ? 'selected' : ''}>cancelled</option>

</select>
    </td>

    <td>
        <div class="action-buttons">
            <a data-bs-toggle="modal"
               data-bs-target="#orderModal"
               onclick='viewOrder(${JSON.stringify(item)}, "view")'
               href="#"
               class="action-btn view-btn">
                <i class="ti ti-eye"></i>
            </a>

           
        </div>
    </td>
</tr>
`;
        });
        $("#OrderDataTable").append(orderTableHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Err : " + error);
    },
  });
}

function getOrderItems(id) {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "getOrderItems",
      id,
    },
    success: function (response) {
      if (response.status == "success") {
        let i = 0;
        let OrderItemDataTable = "";
        response.data.map((item) => {
          i++;
          OrderItemDataTable += ` <tr>
           <td>${i}</td>
            <td>
                <img src="${imgUrl + item.food_image}" 
                     alt="${item.food_name}"
                     width="50"
                     height="50"
                     style="object-fit:cover;border-radius:8px;">
            </td>

            <td>${item.food_name}</td>

            <td>${item.variant_name}</td>

            <td>₹${item.variant_price}</td>

            <td>${item.quantity}</td>

            <td>₹${item.price}</td>

            <td>
                <strong>₹${item.total}</strong>
            </td>
        </tr>
    `;
        });

        $("#OrderItemDataTable").html(OrderItemDataTable);
      } else {
        console.log(response.message);
      }
    },
  });
}
function viewOrder(item) {
  $("#orderNumberView").html(item.order_number);
  $("#orderStatusView").html(item.order_status);
  $("#orderNumberView2").html(item.order_number);
$("#userIdView").html(item.user_id);
$("#restaurantIdView").html(item.restaurant_id);
$("#addressIdView").html(item.address_id);
$("#subtotalView").html(item.subtotal);
$("#taxAmountView").html(item.tax_amount);
$("#deliveryChargeView").html(item.delivery_charge);
$("#discountView").html(item.discount_amount);
$("#grandTotalView").html(item.grand_total);
$("#paymentMethodView").html(item.payment_method);
$("#paymentStatusView").html(item.payment_status);
$("#orderedAtView").html(item.ordered_at);
$("#deliveredAtView").html(item.delivered_at);
$("#notesView").html(item.notes);
  getOrderItems(item.id);
  
}

function updateOrderStatus(el) {
  const orderId = $(el).data("id");
  const statusOrd = $(el).val();
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "orderStatusUpdate",
      id: orderId,
      statusOrd,
    },
    success: function (response) {
      if (response.status == "success") {
        alert("status updated !");
        console.log(`ord${orderId}`);
        $(`#ord${orderId}`).html(statusOrd);
      } else {
        console.log(response.message);
      }
    },
  });
}


function logout() {
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminName");

    window.location.href = "signin.html";
}