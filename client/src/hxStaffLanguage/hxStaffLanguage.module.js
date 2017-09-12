(function(){
    "use strict";
    var translations={};
    translations['vn']={
        MEMBER_DISPLAY:'Quản lý giờ làm',
        GOTO_ADMIN:'Đến trang quản lý',
        EMAIL_MESSAGE:'Email nên có độ dài từ 10 đến 100 lý tự, mẫu: xx@xx.xx',
        PHONE_MESSAGE:'Số điện thoại nên theo mẫu ### #### ####',
        MEMBER_LIST:'Danh sách nhân viên',
        NOW_WORKING_MEMBERS:'Nhân viên đang làm việc',
        TIMECARD_WARNING:'*Timecard gần nhất của bạn có lỗi. Hãy thông báo với người quản lý !',
        STATISTICS:'Thống kê',
    };


    translations['jp']={
        //====PAYMENT APP=====//
        PAYMENT:'会計',
        PRINTER_STATUS:'プリンター管理',
        DISCOUNT:'値引き',
        CUSTOMER_PAY:'預かり金額',
        CASH_BACK:'お釣り',
        GENDER:'性別',
        PAYMENT_DETAILS: 'オーダーの詳細',
        SEARCH_ORDERS:'オーダー検索',
        SEARCH_SEAT_NUMBER:'席検索',
        TAKE_OUT:'TakeOut',
        ERRORS:'オーダー削除',
        STATISTICS:'統計',
        SELECT_STATISTIC_BY_DAY:'日付選択',
        STATISTIC_NOTE:'*注意: 統計機能は開始日の0hより終了日の24hまで計算する',
        START_DATE:'開始日',
        END_DATE:'終了日',
        STATISTIC_INFO:'統計情報',
        SEARCH:'検索',

        CUSTOMER_VIEW:'会計確認',
        SEAT:'席',
        SEAT_NUMBER:'席番号',
        MAN:'男',
        WOMAN:'女',
        PAY:'会計',
        REASON:'理由',
        DELETE_ORDERS:'オーダー削除',
        ORDER_ID:'オーダー番号',
        TOTAL_ORDERS_PRICE:'オーダー合計',

        //===COMMON ==//
        ORDER:'オーダー',
        OR:'もしくは',
        ALL:'全部',
        MENUS:'メニュー',
        PRODUCT_NAME:'商品名',
        ORDERED_ITEMS:'注文済商品',
        TOTAL_PRICE:'合計',
        CONFIRM:'確認',
        TAGS:'タグ',
        TODAY:'今日',
        SOLD:'売上',
        TOTAL:'合計',
        QUANTITY:'数量',

        //= DELETE ORDER REASON =//
        DELETE_REASON_WRONG_ORDER:'オーダー情報が違う',
        DELETE_REASON_WRONG_PRODUCT:'商品情報が違う',
        DELETE_REASON_OTHERS:'その他',

        //=For category Display
        // PHO:'フォー',
        // 'Bánh mỳ':'バンミー',
        // 'Tráng miệng':'デザート',
        // 'Đồ uống':'ドリンク',
        //
        // //=For product Display
        // 'Phở bò':'牛肉フォー',
        // 'Phở gà':'鶏肉フォー',
        // 'Bánh mỳ Pate chả lụa':'バンミー パテ',
        // 'Bánh mỳ xá xíu':'バンミー　サシュ',
        // 'chè thập cẩm':'チェー',
        // 'nước me':'タマリンドジュース',
        // 'nước xoài':'マンゴジュース',
        // 'trà đá':'冷たいティー',
        // 'Cocacola':'コカコーラ',
        // "Bia Saigon":'サイゴン　ビール',
        // "Bia 333":'３３３　ビール',
        // "Bia Asahi chai":'アサヒ　瓶',
        // "Bia Sài Gòn Xanh": 'サイゴンビール・グリーン',
        // "Bia Hà Nội":'ハノイビール',
        //error
        'CHƯA CÓ SỐ GHẾ!':'シートが選択されていません'
    };

    angular.module('hxStaffLanguageModule',['pascalprecht.translate'])
        .config(config);
    config.$inject=['$translateProvider'];
    function config ($translateProvider) {
        // add specific translation tables
        $translateProvider.translations('jp', translations['jp']);
        $translateProvider.translations('vn', translations['vn']);

        // get common translation tables
        $translateProvider.useStaticFilesLoader({
            prefix: '/src/hxStaffLanguage/hx-',
            suffix: '.json'
        });

        // set default language
        $translateProvider.preferredLanguage('vn');
        $translateProvider.fallbackLanguage('vn');
        $translateProvider.forceAsyncReload(true);
    }
})();
