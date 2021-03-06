angular.module('myApp')
    .controller('HomeCtrl', ['$scope', '$css', 'getDataService',
        function ($scope, $css, getDataService) {
            $css.add('./css/home.css');
            // 首页分类菜单
            getDataService.getCateList().success(function (resultData) {
                $scope.cateList = resultData;
            })
            
            // 首页推荐列表
            getDataService.getRecommedCateList().success(function (resultData) {
                $scope.recommedCateList = resultData;
            })
            
            // 监听页面渲染完成事件
            $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                // render 完成后执行的 js
                var mySwiper = new Swiper('#homeMenuContainer', {
                    // 设置slider容器能够同时显示的slides数量
                    slidesPerView : 'auto',
                    // 设置为true则变为free模式，slide会根据惯性滑动且不会贴合。
                    freeMode : true,
                    // slide之间的距离（单位px）
//                  spaceBetween : 20,
                    // 设定为true时，活动块会居中，而不是默认状态下的居左。
//                  centeredSlides : false,
                })
            });
            
            
            // 点击菜单事件
            $scope.choiceMenu = function (id) {
                console.log(id);
            }
            
            // 轮播图
            var mySwiper = new Swiper('#homeBannerContainer', {
                autoplay: 2000,//可选选项，自动滑动
                // 如果设置为false，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
                autoplayDisableOnInteraction : false,
                pagination : '#homeBannerPagination',
                paginationType : 'bullets',
                loop : true,
            })
    }])
    .controller('TopicCtrl', ['$scope', '$css', function ($scope, $css) {
            $scope.name = '我是专题';
            $css.add('./css/topic.css');
    }])
    .controller('SortCtrl', ['$scope', '$css', 'getDataService',
        function ($scope, $css, getDataService) {
            $css.add('./css/sort.css');
            // 分类菜单
            getDataService.getCateList().success(function (resultData) {
                $scope.cateList = resultData;
            })
    }])
    .controller('SortSubPageCtrl', ['$scope', '$css', '$stateParams', 'getDataService',
        function ($scope, $css, $stateParams, getDataService) {
            $css.add('./css/sortSubPage.css');
            getDataService.getSortCateData(+$stateParams.id).success(function (resuleData) {
                $scope.currentCategory = resuleData.currentCategory;
                $scope.cateItemArr = resuleData.categoryItemList;
            })
    }])
    .controller('CartCtrl', ['$scope', '$css', 'getDataService',
        function ($scope, $css, getDataService) {
            $css.add('./css/cart.css');
            $scope.cartItemArr = getDataService.getCartItem();
            
    }])
    .controller('MineCtrl', ['$scope', '$css',
        function ($scope, $css) {
            $css.add('./css/mine.css');
    }])
    .controller('ProductDetailsCtrl', ['$scope', '$css', '$stateParams', '$window', 'getDataService',
        function ($scope, $css, $stateParams, $window, getDataService) {
            $css.add('./css/productDetails.css');
            
            getDataService.getRecommedCateList().success(function (resultData) {
                for (tempCateList of resultData.cateList) {
                    for (tempItemList of tempCateList.itemList) {
                        if ($stateParams.itemId == tempItemList.id) {
                            $scope.productDetailsObj = tempItemList;
                        }
                    }
                }
            })
            
            $scope.addFn = function () {
                getDataService.addCartItem($scope.productDetailsObj);
            }
            
            // 返回方法
            $scope.backFn = function () {
                $window.history.back();
            }
    }])
