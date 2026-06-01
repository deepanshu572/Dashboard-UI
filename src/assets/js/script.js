let apiUrl = "http://localhost/ITS_Food_Backend/admin/api/";
let imgUrl = "http://localhost/ITS_Food_Backend/admin/";
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

           
                 <td>
    <div class="action-buttons">

        <a data-bs-toggle="modal"  onclick='actionVendor(${JSON.stringify(item)}, "view")' data-bs-target="#exampleModal" href="#" class="action-btn view-btn">
            <i class="ti ti-eye"></i>
        </a>

        <a data-bs-toggle="modal" onclick='actionVendor(${JSON.stringify(item)}, "edit")' data-bs-target="#addVendorModal" href="#" class="action-btn edit-btn">
            <i class="ti ti-edit"></i>
        </a>

        <a href="#" onclick='deleteVendor(${JSON.stringify(item)})' class="action-btn delete-btn">
            <i class="ti ti-trash"></i>
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
        console.log(response.message);
      }
    },
  });
}

$("#resturantData").on("change", function () {
  let name = $(this).find("option:selected").text();
  $("#restaurantName").val(name);
  $("#restaurantId").val($(this).val());
});

function deleteVendor(data) {
  $.ajax({
    url: apiUrl,
    method: "POST",
    dataType: "JSON",
    data: {
      type: "deleteVendor",
      id: data.id,
    },
    success: function (response) {
      if (response.status == "success") {
        alert(response.message);
        console.log(response);
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
        let i = 0;

        let resturantHtml = '<option value="">Select Resturant</option>';
        let resturantTableHtml = "";
        response.data.map((item) => {
          resturantHtml += ` <option value="${item.id}">${item.name}</option>`;

          resturantTableHtml += `  <tr class="align-middle " >

           <td>${i + 1}</td>
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

         <a href="#" onclick='deleteResturant(${JSON.stringify(item)})' class="action-btn delete-btn">
            <i class="ti ti-trash"></i>
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
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
  //code
}
function deleteResturant(data) {
  // if (!confirm("Are you sure?")) return;
  // alert(status);
  // $.ajax({
  //   url: apiUrl,
  //   method: "POST",
  //   dataType: "JSON",
  //   data: {
  //     type: "deleteResturant",
  //     id: data.id,
  //     status:status
  //   },
  //   success: function (response) {
  //     if (response.status == "success") {
  //       alert(response.message);
  //       console.log(response);
  //       getResturant();
  //     } else {
  //       console.log(response.message);
  //     }
  //   },
  // });
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
        <span class="badge active">
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

            <a href="#" onclick='deleteCategory(${JSON.stringify(item)})' class="action-btn delete-btn">
                <i class="ti ti-trash"></i>
            </a>

        </div>
    </td>

</tr>`;
        });
        $("#CategoryDataTable").append(categoryTableHtml);
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

  formData.append("id", $("#idCatEd").val());
  formData.append("name", $("#categoryNameEd").val());
  formData.append("sort_order", $("#sortOrderEd").val());
  formData.append("status", $("#statusEd").val());
  formData.append("image", $("#imageEd").val() || $("#imageEd")[0].files[0]);
  formData.append(
    "cover_image",
    $("#coverImgEd").val() || $("#coverImgEd")[0].files[0],
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
    <td>${item.id}</td>
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
        </div>
    </td>
</tr>
`;        });
        $("#CouponDataTable").append(couponTableHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Err : " + error);
    },
  });
}
function actionCoupon() { }
function updateCoupon() {
  //code
}
function deleteCoupon() {
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
        let couponTableHtml = "";
        response.data.map((item) => {
          i++;
       orderTableHtml += `
<tr>
    <td>${item.id}</td>
    <td>${item.order_number}</td>
    <td>${item.user_id}</td>
    <td>${item.restaurant_id}</td>
    <td>${item.address_id}</td>
    <td>₹${item.subtotal}</td>
    <td>₹${item.tax_amount}</td>
    <td>₹${item.delivery_charge}</td>
    <td>₹${item.discount_amount}</td>
    <td>₹${item.grand_total}</td>
    <td>${item.payment_method}</td>
    <td>
        <span class="status-badge ${item.payment_status}">
            ${item.payment_status}
        </span>
    </td>
    <td>
        <span class="status-badge ${item.order_status}">
            ${item.order_status}
        </span>
    </td>
    <td>${item.notes || '-'}</td>
    <td>${item.ordered_at || '-'}</td>
    <td>${item.delivered_at || '-'}</td>
    <td>${item.created_at}</td>
    <td>
        <div class="action-buttons">
            <a data-bs-toggle="modal"
               data-bs-target="#viewOrderModal"
               onclick='actionOrder(${JSON.stringify(item)}, "view")'
               href="#"
               class="action-btn view-btn">
                <i class="ti ti-eye"></i>
            </a>

            <a data-bs-toggle="modal"
               data-bs-target="#editOrderModal"
               onclick='actionOrder(${JSON.stringify(item)}, "edit")'
               href="#"
               class="action-btn edit-btn">
                <i class="ti ti-edit"></i>
            </a>
        </div>
    </td>
</tr>
`;     });
        // $("#ordersDataTable").append(couponTableHtml);
      } else {
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log("AJAX Err : " + error);
    },
  });
}
