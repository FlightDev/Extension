$(document).ready(function(){
    chrome.storage.sync.get('form_name', function(data) {
        $('#form_name').val(data.form_name)
    });
    chrome.storage.sync.get('form_lastname', function(data) {
        $('#form_lastname').val(data.form_lastname)
    });
    chrome.storage.sync.get('form_email', function(data) {
        $('#form_email').val(data.form_email)
    });
    chrome.storage.sync.get('form_credit', function(data) {
        $('#form_credit').val(data.form_credit)
    });
    chrome.storage.sync.get('form_birthyear', function(data) {
        $('#form_birthyear').val(data.form_birthyear)
    });
    chrome.storage.sync.get('form_ed', function(data) {
        $('#form_ed').val(data.form_ed)
    });
    chrome.storage.sync.get('form_edst', function(data) {
        $('#form_edst').val(data.form_edst)
    });
    chrome.storage.sync.get('form_zipcode', function(data) {
        $('#form_zipcode').val(data.form_zipcode)
    });
    chrome.storage.sync.get('form_income', function(data) {
        $('#form_income').val(data.form_income)
    });

    $('#butonnnn').click(submitForm)
});

function submitForm(e) {
    e.preventDefault();
    var form_name = document.getElementById('form_name').value
    var form_lastname = document.getElementById('form_lastname').value
    var form_email = document.getElementById('form_email').value
    var form_credit = document.getElementById('form_credit').value
    var form_birthyear = document.getElementById('form_birthyear').value
    var form_ed = document.getElementById('form_ed').value
    var form_edst = document.getElementById('form_edst').value
    var form_zipcode = document.getElementById('form_zipcode').value
    var form_income = document.getElementById('form_income').value
    
    chrome.storage.sync.set({form_name, form_lastname, form_email, form_credit, form_birthyear, form_ed, form_edst, form_zipcode, form_income}, function() {
    });
}