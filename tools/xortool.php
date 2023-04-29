<!DOCTYPE html>
<html>
    <head lang="en-US">
        <title>XOR Encryptor/Decyptor</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
        <!-- VENDORS -->
        <link rel="stylesheet" href="../assets/vendors/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="../assets/vendors/bootstrap-icons/bootstrap-icons.css">
        <link rel="stylesheet" href="../assets/vendors/aos/aos.css">
    
    
        <link rel="stylesheet" href="../index.css">
        <style>
            textarea, input[type='text'] {
                margin: 4px 0 8px 0;
                width: 100%;
                font-size: 14px;
                padding: 10px 12px;
                outline: 0;
                border: 2px solid #ccc;
            }
            .selection button {
                border-width: 0;
                background-color: #ccc;
                color: #fff;
                font-size: 14px;
                padding: 8px;
                margin-bottom: 10px;
            }
            .selection button:hover {
                background-color: #777;
            }
            .selection .selected {background-color: #777;}
        </style>
    </head>
    <body class="page-index">
        <div class="main container">
            <div class="row gy-4">
                <div class="col-lg-6 col-md-12 shadow">
                    <h2>XOR encryption</h2>
                    <p style="text-align: left;">
                        Base64 is an encoding scheme used to represetn binary data 
                        usually in an ASCII (American Standard Code for Information Interchange)
                        string format. Base64 proves itself to be very useful in transporting
                        data over media that are incompatible with binary data, such as email, web 
                        pages, etc. It is also used to store data in database, however base64 encoding 
                        does not provide any security, it's just convenient for storing and transmitting
                        data.
                    </p>
                </div>
                <div class="col-lg-6 col-md-12 shadow">
                    <div class="d-flex selection">
                        <button class="selection-item selected">Encrypt</button>
                        <button class="selection-item">Decrypt</button>
                    </div>
                    <form action="xortool.php">
                        <div class="form-group">
                            <input type="text" name="key" id="key" placeholder="Enter Your Key" class="form-control my-form-border" required/>
                        </div>
                        <div class="form-group">
                            <textarea name="text" id="target" class="from-control my-form-border" cols="30" rows="10" placeholder="Enter text here" required></textarea>
                        </div>
                        <button type="submit" class="btn-demo" id="action-btn" onclick="triggered()">Encrypt</button>
                    </form>
                    <h5 id="head">Cipher text:</h5>
                    <div class="alert alert-info" id="display"></div>
                </div>
            </div>
        </div>

        <script src="../assets/vendors/jquery/jquery-3.6.1.js"></script>
        <script>
            let id = 0;
            $('document').ready(function() {

                let items = $('.selection-item');
                for (let i = 0; i < items.length; i++) {
                    items[i].onclick = function(e) {
                        this.classList.toggle('selected');

                        if (i == 0) {
                            items[i + 1].classList.toggle('selected');
                            $('#head').text('Cipher text:');
                            $('#action-btn').text('Encrypt');
                            id = 0;
                        } else {
                            items[i - 1].classList.toggle('selected');
                            $('#head').text('Plain text:');
                            $('#action-btn').text('Decrypt');
                            id = 1;
                        }
                    }
                }

                $('#action-btn').submit(function() { triggered();  return false; });

                $('#target').keyup(function() {
                    triggered();
                });
            });

            function triggered() {
                let str = $('#target').val();
                console.log(str);
                let res = xorOps(str, $('#key').val());

                $('#display').text(res);
            }

            function xorOps(str, key) {
    
                let encoded = "";
                for (let i = 0; i < str.length; i++) {
                    let ch = str.charCodeAt(i);
                    encoded += String.fromCharCode(ch ^ key);
                }

                return encoded;
            }
            
        </script>
        <?php 
            echo $GET['key'];
        ?>
    </body>
</html>