sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'zattachmentsample',
            componentId: 'ZC_ATTACHMENT_DIPList',
            contextPath: '/ZC_ATTACHMENT_DIP'
        },
        CustomPageDefinitions
    );
});