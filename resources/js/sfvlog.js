var matches;
function reqHttp(resource){
    var xhttp = new XMLHttpRequest();
    var prefix = '';
    var optionHTML = '';
    
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.responseText)[resource];
            switch (resource) {
                case 'characters':
                    prefix = 'char';
                    break;
                case 'opponents':
                    prefix = 'opp';
                    break;
                case 'ranks':
                    prefix = 'rank';
                    break;
                case 'matches':
                    matches = res;
                    sortMatches();
                    return;
            }
            optionHTML += "<option value= '0'>All " + resource.charAt(0).toUpperCase() + resource.slice(1) + "</option>"
            for (var key in res) {
                if (res.hasOwnProperty(key)) {
                    optionHTML += "<option value= '" + res[key][prefix+'_id']  + "'>" + res[key][prefix+'_name'] + "</option>";
                }
            }
            switch (resource) {
                case 'characters':
                    document.getElementById('my_chars').innerHTML = optionHTML;
                    document.getElementById('opp_chars').innerHTML = optionHTML;
                    break;
                default:
                    document.getElementById(resource).innerHTML = optionHTML;
            }
        }
    };
    xhttp.open("GET", "https://psynr0j4v5.execute-api.us-east-1.amazonaws.com/prod/"+resource, true);	
    xhttp.send(null);
}
function sortMatches (season = 0, type = 0, my_char = 0, opp = 0, opp_rank = 0, opp_char = 0, result = 0, ){
    season = $('#season').val();
    type = $('#type').val();
    my_char = $('#my_chars').val();
    opp = $('#opponents').val();
    opp_rank = $('#ranks').val();
    opp_char = $('#opp_chars').val();
    result = $('#result').val();
    var resultHTML = '<div class=\'row\'><strong><div class=\'col-xs-1 ranbats\'>Season</div><div class=\'col-xs-1 ranbats\'>Type</div><div class=\'col-xs-2 ranbats\'>My Char</div><div class=\'col-xs-3 ranbats\'>Opp Name</div><div class=\'col-xs-2 ranbats\'>Opp Rank</div><div class=\'col-xs-2 ranbats\'>Opp Char</div><div class=\'col-xs-1 ranbats\'>Result</div></strong></div>';
    
    
    for (var i in matches){
        if ((matches[i]['season'] == season || season == 0) && (matches[i]['match_type'] == type || type == 0) && (matches[i]['My Character']['char_id'] == my_char || my_char == 0) && (matches[i]['opponent']['opp_id'] == opp || opp == 0) && (matches[i]['opponent']['rank']['rank_id'] == opp_rank || opp_rank == 0) && (matches[i]['Opponent Character']['char_id'] == opp_char || opp_char == 0) && (matches[i]['result'] == result || result == 0)){
            var match_type = '';
            var win_loss = '';
            var rank_name = '';
            switch (matches[i]['match_type']) {
                case 1:
                    match_type = "Ranked";
                    break;
                case 2:
                    match_type = "Casual";
                    break;
                case 3:
                    match_type = "Lounge";
                    break;
            }
            switch (matches[i]['result']) {
                case 1:
                    win_loss = "Win";
                    break;
                case 2:
                    win_loss = "Loss";
                    break;
            }
            switch (matches[i]['opponent']['rank']['rank_id']) {
                case 19:
                    rank_name = "Ult. Grand Master";
                    break;
                default:
                    rank_name = matches[i]['opponent']['rank']['rank_name'];
            }
        
            resultHTML += "<div id='" + matches[i]['match_id'] + "' class='row'><div class='col-xs-1 ranbats'>" + matches[i]['season'] + "</div><div class='col-xs-1 ranbats'>" + match_type + "</div><div class='col-xs-2 ranbats'>" + matches[i]['My Character']['char_name'] + "</div><div class='col-xs-3 ranbats'>" + matches[i]['opponent']['opp_name'] + "</div><div class='col-xs-2 ranbats'>" + rank_name + "</div><div class='col-xs-2 ranbats'>" + matches[i]['Opponent Character']['char_name'] + "</div><div class='col-xs-1 ranbats'>" + win_loss + "</div></div>"
        }
    }
    document.getElementById('results').innerHTML = resultHTML;
}

reqHttp('characters');
reqHttp('ranks');
reqHttp('opponents');
reqHttp('matches');

