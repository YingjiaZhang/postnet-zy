/**
 * Created by Sunshine on 2016/8/8.
 */
$(document).ready(function () {
    let tr_count=0;
    $('#ok').click(function () {

        $('#promot_msg').hide();
        $('#err_msg').hide();
        $('#err_msg').text('Error! inputs is leage.Please input try again.');
        $('#result').text('');

        var code = $('#inputs_code').val();
        if (code === '') {
            //提示用户输入：
            $('#promot_msg').show();
            return;
        }

        if ($('#barToZip').is(":checked")) {
            if (secBarCode(code)) {
                $.post('/barToZip', {
                        code: code
                    }, function (data, status) {

                        if (status === 'success') {

                            if (data === 'ERROR_TYPE_ONE') {
                                $('#err_msg').text('Error! 条形码格式错误 ！');
                                $('#err_msg').show();
                                return;
                            }
                            if (data === 'ERROR_TYPE_TWO') {
                                $('#err_msg').text('Error! 校验码验证错误 ！');
                                $('#err_msg').show();
//                                            $('#err_msg').text('Error! inputs is leage.Please input try again.');
                                return;
                            }
                            $('#result').text(data);
                            $('#history tr:first').after('<tr class="' + 'text-center' + '"' + '><td>'
                                + code + '</td><td>' + data + '</td></tr>');
                            tr_count++;
                            alert(tr_count);
                            if(tr_count>3){
                                alert();
                                $('#history').remove($('#history tr:last'));
                            }
                            return;
                        }

                    }
                );

            } else {
                $('#err_msg').show();
                return;
            }
        }

        if ($('#zipToBar').is(":checked")) {
            if (secPostCode(code)) {
                $.post('/zipToBar', {
                        code: code
                    }, function (data, status) {
                        if (status === 'success') {
                            if (data === 'ERROR_TYPE_THREE') {
                                $('#err_msg').text('Error! 邮编格式错误 ！');
                                $('err_msg').show();
                                return;
                            }
                            $('#result').text(data);

                            alert(tr_count);
                            if(tr_count>=3){
                                alert('----------');
                               $('#history tr:last').empty();
                            }
                            tr_count++;
                            $('#history tr:first').after(
                                '<tr class="' + 'text-center' + '"' + '><td>'
                                + code + '</td><td>' + data + '</td></tr>');

                            return;
                        }

                    }
                );
            } else {
                $('#err_msg').show();
                return;
            }
        }

    });
    $('#inputs_code').focusin(function () {
        $('#promot_msg').hide();
        $('#err_msg').text('Error! inputs is leage.Please input try again.');
        $('#err_msg').hide();
    });
});