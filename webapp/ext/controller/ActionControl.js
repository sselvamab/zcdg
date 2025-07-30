/*sap.ui.define(["sap/ui/core/Fragment",
    "sap/m/MessageToast"
], function(Fragment, MessageToast) {
    'use strict';

    return {
        openFileUpload: function(oEvent) {
            MessageToast.show("Custom handler invoked.");

            if (!this.pDialog) {
                Fragment.load({

                    name: "zattachmentsample.fragment.Popup",
                    type: "XML",
                    controller: this
                }).then((oDialog) => {
                    //var oFileUploader = Fragment.byId("excel_upload", "uploadSet");
                    //oFileUploader.removeAllItems();
                    this.pDialog = oDialog;
                    this.pDialog.open();
                })
                    .catch(error => alert(error.message));
            } else {
                //var oFileUploader = Fragment.byId("excel_upload", "uploadSet");
                //oFileUploader.removeAllItems();
                this.pDialog.open();
            }            
        },

		handleUploadPress: function(oEvent) {
			var oFileUploader = this.byId("fileUploader1");
			oFileUploader.checkFileReadable().then(function() {
				oFileUploader.upload();
                var oPromise = this.extensionAPI.invokeActions("/LoadExcelContent",this.getView().getBindingContext(),{
                    "excelattachment": 'salesorder'
                } );
    
                oPromise.then(
                    function (aResponse) {
                        // perform further manipulation based on data
                    },
                    function (oError) {
                               //Error handling
                    });                    
			}, function(error) {
				MessageToast.show("The file cannot be read. It may have changed.");
			}).then(function() {
				oFileUploader.clear();
			});
		}

    };
}); */

sap.ui.define(["sap/ui/core/Fragment", 
    "sap/ui/model/odata/v4/Context", 
            "sap/suite/ui/generic/template/ListReport/extensionAPI/ExtensionAPI", "sap/ui/model/json/JSONModel"

],
    function (Fragment, Context, ExtensionAPI, JSONModel){
        "use strict";
        return {
            openFileUpload: function(oEvent) {
               // var oView = this.getView();
                if (!this.pDialog) {
                    Fragment.load({
                        id: "excel_upload",
                        name: "zattachmentsample.fragment.Popup",
                        type: "XML",
                        controller: this,
                        autoPrefixId: false
                    }).then((oDialog) => {
                        var oFileUploader = Fragment.byId("excel_upload", "uploadSet");
                        //oFileUploader.removeAllItems();
                        this.pDialog = oDialog;
                        this.pDialog.open();
                    })
                        .catch(error => alert(error.message));
                } else {
                    var oFileUploader = Fragment.byId("excel_upload", "uploadSet");
                    //oFileUploader.removeAllItems();
                    this.pDialog.open();
                }
            },

            convertBinaryToHex: function(buffer) {
                return Array.prototype.map.call(new Uint8Array(buffer), function(x) {
                    return ("00" + x.toString(16)).slice(-2);
                }).join("");
            },

            handleUploadPress: function(oEvent) {
                console.log("Upload Button Clicked!!!")

                var oFile = sap.ui.getCore().byId("excel_upload--fileUploader1").oFileUpload.files[0];
                var fileType = sap.ui.getCore().byId("excel_upload--fileUploader1").oFileUpload.files[0].type;
                var fileName = sap.ui.getCore().byId("excel_upload--fileUploader1").oFileUpload.files[0].name;

                var that = this;
                if (oFile && window.FileReader) {
                    var reader = new FileReader();
                    //onload function
                    reader.onload = function(evt) {
                        //file string
                        
                        this.sBinaryData = evt.target.result;
                      //   sap.ui.core.util.File.save(sFileContent, "filename", "xls", "application/vnd.ms-excel");
                      //   that.sBinaryData = window.btoa(unescape(encodeURIComponent(sFileContent))); 
                        //that.sBinaryData  = that.convertBinaryToHex(raw).toUpperCase();                         
                    };
                    //reader.readAsText(oFile);
                    reader.readAsBinaryString(oFile);
                } else {
                    //File Reader not supported
                    alert("Please Upload a CSV File!");
                }     
            },

            onUploadSet: function(oEvent) {
           
                var operation = this._controller.extensionAPI.getModel().bindContext("/ZC_ATTACHMENT_DIP/com.sap.gateway.srvd.zui_attachment_dip_o4.v0001.LoadExcelContent(...)")
                operation.setParameter("excelattachment", this.sBinaryData );

                operation.execute()
                .then(function (oResultContext) {
                    // Handle successful invocation and the returned context
                    console.log("Operation invoked successfully. Result:", oResultContext.getObject());
                }.bind(this))
                .catch(function (oError) {
                    // Handle errors during invocation
                    console.error("Error invoking operation:", oError);
                });

                // Invoke the operation
          /*      oActionBinding.execute()
.then(function (oResultContext) {
    // Handle successful invocation and the returned context
    console.log("Operation invoked successfully. Result:", oResultContext.getObject());
}.bind(this))
.catch(function (oError) {
    // Handle errors during invocation
    console.error("Error invoking operation:", oError);
});*/

                /*var oPromise = this._controller.extensionAPI.invokeActions("/LoadExcelContent",this.getView().getBindingContext(),{
                    "excelattachment": 'salesorder'
                } );
    
                oPromise.then(
                    function (aResponse) {
                        // perform further manipulation based on data
                    },
                    function (oError) {
                               //Error handling
                    });                     

                /* TODO:Call to OData */
            },
            onTempDownload: function (oEvent) {
                console.log("Template Download Button Clicked!!!")
                /* TODO: Excel file template download */
            },
            onCloseDialog: function (oEvent) {
                this.pDialog.close();
            },
            onBeforeUploadStart: function (oEvent) {
                console.log("File Before Upload Event Fired!!!")
                /* TODO: check for file upload count */
            },
            onUploadSetComplete: function (oEvent) {
                console.log("File Uploaded!!!")
                /* TODO: Read excel file data*/
            },
            onItemRemoved:function (oEvent) {
                console.log("File Remove/delete Event Fired!!!")  
                /* TODO: Clear the already read excel file data */          
            }
        };
    });
