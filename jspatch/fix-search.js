require("UILabel, UIScreen, UIColor");

defineClass("DoctorListHotRecommendWordCell", {
    shouldUpdateCellWithObject: function(object) {
        self.super().shouldUpdateCellWithObject(object);

        self.contentView().removeAllSubviews();
        var item = object;
        var keywords = item.keyWordList().toJS();
        for (var i in keywords) {
            var keyword = keywords[i];
            var label = UILabel.labelWithFontSize_hexFontColor_text(13, 0x666666, keyword);
            label.sizeToFit();
            label.setTextAlignment(1); // NSTextAlignmentCenter
            label.setWidth(label.width() + 36);
            label.setHeight(label.height() + 10);
            label.cySetBorderHexColor_width_cornerRadius(0xcccccc, 0.5, 0);
            label.setBackgroundColor(UIColor.whiteColor());
            label.cyMakeRound();
            self.contentView().addSubview(label);

            self.setupTagTap(label, keyword);
        }
        self.layoutTags();

        return true;
    },
    layoutTags: function() {
        var xOffset = 12;
        var yOffset = 15;
        var screenWidth = UIScreen.mainScreen().bounds().width;
        var labels = self.contentView().subviews().toJS();
        for (var i in labels) {
            var l = labels[i];
            if (xOffset + l.width() + 6 > screenWidth) {
                yOffset = yOffset + l.height() + 10;
                xOffset = 12;
            }
            l.setLeft(xOffset);
            l.setTop(yOffset);
            xOffset = xOffset + l.width() + 9;
        }
    },
    setupTagTap: function(label, keyword) {
        var s = self;
        label.cyAddTapGestureWithActionBlock(block("NSString *", function(gesture) {
            s.searchDoctor(keyword);
        }));
    },
    searchDoctor: function(keyword) {
        var vc = self.viewController();
        vc.userDidInputQuery(keyword);
    },
    layoutSubviews: function() {
        self.super().layoutSubviews();
    }
});