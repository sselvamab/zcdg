sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'zattachmentsample/test/integration/FirstJourney',
		'zattachmentsample/test/integration/pages/ZC_ATTACHMENT_DIPList',
		'zattachmentsample/test/integration/pages/ZC_ATTACHMENT_DIPObjectPage'
    ],
    function(JourneyRunner, opaJourney, ZC_ATTACHMENT_DIPList, ZC_ATTACHMENT_DIPObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('zattachmentsample') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheZC_ATTACHMENT_DIPList: ZC_ATTACHMENT_DIPList,
					onTheZC_ATTACHMENT_DIPObjectPage: ZC_ATTACHMENT_DIPObjectPage
                }
            },
            opaJourney.run
        );
    }
);