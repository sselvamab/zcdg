sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'zattachmentsample',
            componentId: 'ZC_ATTACHMENT_DIPObjectPage',
            contextPath: '/ZC_ATTACHMENT_DIP'
        },
        CustomPageDefinitions
    );
});