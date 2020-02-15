var matches
function getChars() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.responseText)['characters'];
            var charHTML = '<option value="0">All Characters</option>';
            for (var key in res) {
                if (res.hasOwnProperty(key)) {
                    charHTML += "<option value= '" + res[key]['char_id']  + "'>" + res[key]['char_name'] + "</option>";
                }
            }
            document.getElementById('my_chars').innerHTML = charHTML;
            document.getElementById('opp_chars').innerHTML = charHTML;
        }
    };
    xhttp.open("GET", "https://psynr0j4v5.execute-api.us-east-1.amazonaws.com/prod/characters/", true);	
    xhttp.send(null);
}
function getOpponents() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.responseText)['opponents'];
            var oppHTML = '<option value="0">All Opponents</option>';
            for (var key in res) {
                if (res.hasOwnProperty(key)) {
                    oppHTML += "<option value= '" + res[key]['opp_id'] + "'>" + res[key]['opp_name'] + "</option>";
                }
            }
            document.getElementById('opponents').innerHTML = oppHTML;
        }
    };
    xhttp.open("GET", "https://psynr0j4v5.execute-api.us-east-1.amazonaws.com/prod/opponents/", true);	
    xhttp.send(null);
}
function getRanks() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.responseText)['ranks'];
            var rankHTML = '<option value="0">All Ranks</option>';
            for (var key in res) {
                if (res.hasOwnProperty(key)) {
                    rankHTML += "<option value= '" + res[key]['rank_id'] + "'>" + res[key]['rank_name'] + "</option>";
                }
            }
            document.getElementById('opp_ranks').innerHTML = rankHTML;
        }
    };
    xhttp.open("GET", "https://psynr0j4v5.execute-api.us-east-1.amazonaws.com/prod/ranks/", true);	
    xhttp.send(null);
}
function getMatches() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            matches = JSON.parse(xhttp.responseText)['matches'];
            sortMatches();
        }
    };
    xhttp.open("GET", "https://psynr0j4v5.execute-api.us-east-1.amazonaws.com/prod/matches/", true);	
    xhttp.send(null);
}
getChars();
getRanks();
getOpponents();
getMatches();


function sortMatches (){
    var season = $('#season').val();
    var type = $('#type').val();
    var my_char = $('#my_chars').val();
    var opp = $('#opponents').val();
    var opp_rank = $('#opp_ranks').val();
    var opp_char = $('#opp_chars').val();
    var result = $('#result').val();
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