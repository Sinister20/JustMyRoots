/* eslint-disable no-unused-vars */
const MockApiConstants = {
  moduleName: {
    apiName: {
      apiConfig: {
        url: '/api/test/testpath/{pathID}',
        method: 'POST',
      },
      config: {
        pathVariables: {
          policyRefId: '', // Value to be set in the component
        },
        urlParams: {
          sampleParamKey: '', // Key value to be set in the component
        },
        headers: {
          sampleParamKey: '', // Key value to be set in the component
          // Authorization: ' ',
        },
      },
      attachPrefix: true,
      skipAuth: false, // ForJWT- Used for calls where authis not required
      useRefreshToken: false, // ForJWT- Default(assumed):false --> Enforces refresh_token to be used instead of access_token
    },
  },
};
/* eslint-enable no-unused-vars */

const ApiConstants = {
  Payment: {
    ccAvanue: {
      apiConfig: {
        url: '/api/payment/pay',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    maaCcAvenue: {
      apiConfig: {
        url: '/api/payment/pay-dfh',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    retryPayments: {
      apiConfig: {
        url: '/api/payment/repay',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  Auth: {
    sendOtp: {
      apiConfig: {
        url: '/api/web/auth/verifyMobileOtp',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    requestOtp: {
      apiConfig: {
        url: '/api/web/auth/sendMobileOtp',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },

  Cart: {
    addItemToCart: {
      apiConfig: {
        url: '/api/web/cart/addToCart',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    fetchCart: {
      apiConfig: {
        url: '/api/web/cart/getCartDetails',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    submitCart: {
      apiConfig: {
        url: '/api/web/order/submitOrder',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    applyCoupon: {
      apiConfig: {
        url: '/api/web/cart/applyCouponToCart',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    applyLoyalty: {
      apiConfig: {
        url: '/api/web/cart/loyalty-point/apply',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    setDeliveryAddrs: {
      apiConfig: {
        url: '/api/web/set-default-address',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getDeliveryAddrs: {
      apiConfig: {
        url: '/api/web/get-default-address',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getCoupon: {
      apiConfig: {
        url: '/api/web/cart/getCoupons',
        method: 'GET',
      },
      urlParams: {
        brandId: '', // Key value to be set in the component
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  MyAccount: {
    addUserDetails: {
      apiConfig: {
        url: '/api/web/user',
        method: 'PUT',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getUserDetails: {
      apiConfig: {
        url: '/api/web/user',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getUserList: {
      apiConfig: {
        url: '/api/panel/user-list',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getOrders: {
      apiConfig: {
        url: '/api/web/order/getMyOrders',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getAddress: {
      apiConfig: {
        url: '/api/web/address',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    addAddress: {
      apiConfig: {
        url: '/api/web/address',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    cancelMyOrder: {
      apiConfig: {
        url: '/api/web/order/cancelMyOrder',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    contactUs: {
      apiConfig: {
        url: 'api/contact-us',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    updateAddress: {
      apiConfig: {
        url: '/api/web/address/update/{id}',
        method: 'POST',
      },
      config: {
        pathVariables: {
          id: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    deleteAddress: {
      apiConfig: {
        url: '/api/web/address/delete/{id}',
        method: 'DELETE',
      },
      config: {
        pathVariables: {
          id: '', // Value to be set in the component
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    reOrder: {
      apiConfig: {
        url: '/api/web/re-order',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  Brand: {
    getBrand: {
      apiConfig: {
        url: '/api/panel/brand-list',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getBrandsList: {
      apiConfig: {
        url: '/api/panel/brand',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    addBrand: {
      apiConfig: {
        url: '/api/panel/brand',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    updateBrand: {
      apiConfig: {
        url: '/api/panel/brand',
        method: 'PUT',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    deleteBrand: {
      apiConfig: {
        url: '/api/panel/brand/?brandId={id}',
        method: 'DELETE',
      },
      config: {
        pathVariables: {
          id: '', // Value to be set in the component
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  Product: {
    getItem: {
      apiConfig: {
        url: '/api/panel/item',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    productListById: {
      apiConfig: {
        url: '/api/panel/item',
        method: 'GET',
      },
      urlParams: {
        brandId: '', // Key value to be set in the component
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    addItem: {
      apiConfig: {
        url: '/api/panel/item',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    updateItem: {
      apiConfig: {
        url: '/api/panel/item',
        method: 'PUT',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    deleteItem: {
      apiConfig: {
        url: '/api/panel/item?itemId={id}',
        method: 'DELETE',
      },
      config: {
        pathVariables: {
          id: '', // Value to be set in the component
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  LocationToLocation: {
    addDeliverylocation: {
      apiConfig: {
        url: '/api/panel/delivery-location',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getDeliveryLocations: {
      apiConfig: {
        url: '/api/panel/delivery-location',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    updateDeliveryLocation: {
      apiConfig: {
        url: '/api/panel/delivery-location',
        method: 'PUT',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    deleteDeliveryLocation: {
      apiConfig: {
        url: '/api/panel/delivery-location?id={id}',
        method: 'DELETE',
      },
      config: {
        pathVariables: {
          id: '', // Value to be set in the component
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  Location: {
    addLocation: {
      apiConfig: {
        url: '/api/panel/city',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getLocations: {
      apiConfig: {
        url: '/api/panel/city',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    locationListById: {
      apiConfig: {
        url: '/api/panel/city/?state={id}',
        method: 'GET',
      },
      config: {
        pathVariables: {
          id: '', // Value to be set in the component
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    updateLocation: {
      apiConfig: {
        url: '/api/panel/city',
        method: 'PUT',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    deleteCity: {
      apiConfig: {
        url: '/api/panel/city?id={id}',
        method: 'DELETE',
      },
      config: {
        pathVariables: {
          id: '', // Value to be set in the component
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  Meta: {
    addMeta: {
      apiConfig: {
        url: '/api/panel/meta',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getMetaList: {
      apiConfig: {
        url: '/api/panel/meta',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    updateMeta: {
      apiConfig: {
        url: '/api/panel/meta',
        method: 'PUT',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    deleteMeta: {
      apiConfig: {
        url: '/api/panel/meta?id={id}',
        method: 'DELETE',
      },
      config: {
        pathVariables: {
          id: '', // Value to be set in the component
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  Coupon: {
    addCoupon: {
      apiConfig: {
        url: '/api/panel/coupon',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getCouponList: {
      apiConfig: {
        url: '/api/panel/coupon',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    updateCoupon: {
      apiConfig: {
        url: '/api/panel/coupon',
        method: 'PUT',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    deleteCoupon: {
      apiConfig: {
        url: '/api/panel/coupon?id={id}',
        method: 'DELETE',
      },
      config: {
        pathVariables: {
          id: '', // Value to be set in the component
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  Order: {
    getOrders: {
      apiConfig: {
        url: '/api/orders',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    updateOrder: {
      apiConfig: {
        url: '/api/order-status',
        method: 'PUT',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  MaKHathKaKhana: {
    uomMetaFetch: {
      apiConfig: {
        url: '/api/web/cart/dfh-meta-data',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    MaKHathKaKhanaCreate: {
      apiConfig: {
        url: '/api/web/cart/addToDFHCart',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    MaKHathKaKhanaDelete: {
      apiConfig: {
        url: '/api/web/cart/addToDFHCart',
        method: 'DELETE',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    validateDFHCity: {
      apiConfig: {
        url: '/api/web/dfh/validate-city',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    validateDFH: {
      apiConfig: {
        url: '/api/web/cart/validateDFH',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    wishADish: {
      apiConfig: {
        url: '/api/wish-dish',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  Banner: {
    getBannerData: {
      apiConfig: {
        // url: '/api/web/banner/fetch',
        url: "/api/web/bannerlist?type=WEB",
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    offersFetch: {
      apiConfig: {
        url: '/api/web/offer/fetch',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    heroVideoFetch: {
      apiConfig: {
        url: '/api/web/video/fetch',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    deliveryInLoc: {
      apiConfig: {
        url: '/api/web/citylist',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    deliveryInState: {
      apiConfig: {
        url: '/api/web/state',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    cityByState: {
      apiConfig: {
        url: '/api/web/city-by-state/',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    pincodeByCity: {
      apiConfig: {
        url: '/api/web/pin-by-city/',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    setDeliveryLoc: {
      apiConfig: {
        url: '/api/web/delivery-set-in',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  cities: {
    fetchCities: {
      apiConfig: {
        url: '/api/web/city/fetch',
        // url: '/api/web/pickupcitylist',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    fetchCityItems: {
      apiConfig: {
        url: '/api/web/cityItems/{id}',
        method: 'GET',
      },
      config: {
        pathVariables: {
          id: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  restaurent: {
    fetchBrandDetails: {
      apiConfig: {
        url: '/api/web/brand/details/{brandID}',
        method: 'GET',
      },
      config: {
        pathVariables: {
          brandID: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    featureItems: {
      apiConfig: {
        url: '/api/web/brand/feature/items/{brandID}',
        method: 'GET',
      },
      config: {
        pathVariables: {
          brandID: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    fetchBrandItem: {
      apiConfig: {
        url: '/api/web/brand/items/{brandID}',
        method: 'GET',
      },
      config: {
        pathVariables: {
          brandID: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    fetchItemById: {
      apiConfig: {
        url: '/api/web/brand/feature/items/{brandID}?itemId={itemId}',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    fetchCustomerBoughtItem: {
      apiConfig: {
        url: '/api/web/meta-related-item/{itemId}?selectedCity={cityId}',
        method: 'GET',
      },
      config: {
        pathVariables: {
          itemId: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  SearchPage: {
    searchByKey: {
      apiConfig: {
        url: '/api/web/search/v2',
        method: 'GET',
      },
      config: {
        urlParams: {
          searchKey: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    searchResultsByKey: {
      apiConfig: {
        url: '/api/web/search/searched-products',
        method: 'GET',
      },
      config: {
        urlParams: {
          keyword: '',
          // filter: '',
          // sort: '',
          // offer: '',
          // cost: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  HomePage: {
    metaByKeyword: {
      apiConfig: {
        url: '/api/web/dashboard/meta',
        method: 'GET',
      },
      config: {
        urlParams: {
          keyword: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    metaByType: {
      apiConfig: {
        url: '/api/web/dashboard/meta',
        method: 'GET',
      },
      config: {
        urlParams: {
          type: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    testimonials: {
      apiConfig: {
        url: '/api/web/testimonial',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    subscribe: {
      apiConfig: {
        url: '/api/subscribe',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    ourPartners: {
      apiConfig: {
        url: '/api/web/dashboard/meta?keyword=our-partners',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  Reports: {
    orderReport: {
      apiConfig: {
        url: '/api/reports/order',
        method: 'GET',
      },
      config: {
        urlParams: {
          customerId: '',
          orderStartDate: '',
          orderEndDate: '',
          pickupStartDate: '',
          pickupEndDate: '',
          deliveryStartDate: '',
          deliveryEndDate: '',
          deliveryLocation: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    salesReport: {
      apiConfig: {
        url: '/api/reports/sales',
        method: 'GET',
      },
      config: {
        urlParams: {
          customerId: '',
          orderStartDate: '',
          orderEndDate: '',
          pickupStartDate: '',
          pickupEndDate: '',
          deliveryStartDate: '',
          deliveryEndDate: '',
          deliveryLocation: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    invoiceReport: {
      apiConfig: {
        url: '/api/reports/invoices',
        method: 'GET',
      },
      config: {
        urlParams: {
          customerId: '',
          orderStartDate: '',
          orderEndDate: '',
          pickupStartDate: '',
          pickupEndDate: '',
          deliveryStartDate: '',
          deliveryEndDate: '',
          deliveryLocation: '',
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  MyFavorite: {
    getFavorite: {
      apiConfig: {
        url: '/api/get-favourites?cityId={id}',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    saveFavorite: {
      apiConfig: {
        url: '/api/save-favourite',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  LoyaltyPoint: {
    getLoyaltyPointHistory: {
      apiConfig: {
        url: '/api/get-loyalty-history?customerId={customerId}',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  CustomerFeedBack: {
    feedBackSurvey: {
      apiConfig: {
        url: '/api/web/feedback-survey',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    submitFeedBack: {
      apiConfig: {
        url: '/api/web/feedback',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },

  ContactUs: {
    submitContact: {
      apiConfig: {
        url: '/api/contact-us',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  Testimonial: {
    addTestimonial: {
      apiConfig: {
        url: '/api/panel/testimonial',
        method: 'POST',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    getTestimonialList: {
      apiConfig: {
        url: '/api/web/testimonial',
        method: 'GET',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    updateTestimonial: {
      apiConfig: {
        url: '/api/panel/testimonial',
        method: 'PUT',
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
    deleteTestimonial: {
      apiConfig: {
        url: '/api/panel/testimonial?id={id}',
        method: 'DELETE',
      },
      config: {
        pathVariables: {
          id: '', // Value to be set in the component
        },
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    },
  },
  PendingPayment: {
    submitPayment: {
      apiConfig: {
        url: '/api/pending/payment/pay',
        method: "POST"
      },
      attachPrefix: true,
      skipAuth: false,
      useRefreshToken: false,
    }

  }
};

export default ApiConstants;
