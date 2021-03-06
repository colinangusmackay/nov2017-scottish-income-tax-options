$(function(){
    $("#calculate").on("click", function(){
        var personalAllowance = parseInt($("#taxAllowance").val()),
            grossIncome = parseInt($("#grossIncome").val());
        updateOptions(personalAllowance, grossIncome);
    });

    function updateOptions(personalAllowance, grossIncome){
        var options = [{
            id:"sq",
            bands: [
                {size:personalAllowance, rate:0},
                {size:31500,rate:20},
                {size:107000, rate:40},
                {size:Number.MAX_SAFE_INTEGER, rate:45}
            ]
        },{
            id:"one",
            bands: [
                {size:personalAllowance, rate:0},
                {size:32440,rate:20},
                {size:105710, rate:41},
                {size:Number.MAX_SAFE_INTEGER, rate:46}
            ]
        },{
            id:"two-a",
            bands: [
                {size:personalAllowance, rate:0},
                {size:12150,rate:20},
                {size:20290,rate:21},
                {size:105710, rate:41},
                {size:Number.MAX_SAFE_INTEGER, rate:48}
            ]
        },{
            id:"two-b",
            bands: [
                {size:personalAllowance, rate:0},
                {size:12150,rate:20},
                {size:20290,rate:21},
                {size:105710, rate:41},
                {size:Number.MAX_SAFE_INTEGER, rate:50}
            ]
        },{
            id:"three",
            bands: [
                {size:personalAllowance, rate:0},
                {size:12150,rate:20},
                {size:20290,rate:21},
                {size:30710, rate:41},
                {size:75000, rate:42},
                {size:Number.MAX_SAFE_INTEGER, rate:48}
            ]
        },{
            id:"four",
            bands: [
                {size:personalAllowance, rate:0},
                {size:3150,rate:19},
                {size:9000,rate:20},
                {size:20290,rate:21},
                {size:30710, rate:41},
                {size:75000, rate:42},
                {size:Number.MAX_SAFE_INTEGER, rate:50}
            ]
        }];

        var statusQuo = 0;
        for(var optionsIndex = 0; optionsIndex < options.length; optionsIndex++){

            var option = options[optionsIndex],
                bands = option.bands,
                idPrefix = option.id,
                remainingIncome = grossIncome,
                bandLow = 0,
                totalTax = 0;
            totalTax = 0;
            for(var bandsIndex = 0; bandsIndex < bands.length; bandsIndex++){
                var band = bands[bandsIndex],
                    bandId = "#"+idPrefix+"-"+bandsIndex,
                    taxableIncomeInBand = remainingIncome,
                    bandHigh =  bandLow + band.size;
                if (band.size === Number.MAX_SAFE_INTEGER)
                    bandHigh = Number.MAX_SAFE_INTEGER;
                if (taxableIncomeInBand > band.size)
                    taxableIncomeInBand = band.size;
                var taxInBand = taxableIncomeInBand * (band.rate/100.0);
                totalTax + taxInBand;

                if (bandHigh === Number.MAX_SAFE_INTEGER)
                    $(bandId+" .taxable").text("£"+bandLow+" to £∞");
                else
                    $(bandId+" .taxable").text("£"+bandLow+" to £"+bandHigh);

                $(bandId+" .rate").text(band.rate+"%");
                $(bandId+" .yourIncome").text("£"+taxableIncomeInBand.toFixed(2));
                $(bandId+" .yourTax").text("£"+taxInBand.toFixed(2));

                remainingIncome = remainingIncome - taxableIncomeInBand;
                bandLow = bandHigh;
                totalTax += taxInBand;
            }

            if (idPrefix === "sq")
                statusQuo = totalTax;
            var totalId = "#"+idPrefix+"-total";
            $(totalId+" .yourIncome").text("£"+grossIncome.toFixed(2));
            $(totalId+" .yourTax").text("£"+totalTax.toFixed(2));

            var differenceFromStatusQuo = totalTax - statusQuo,
                monthlyDifference = differenceFromStatusQuo / 12,
                weeklyDifference = differenceFromStatusQuo / 52,
                summaryPrefix = "#summary-"+idPrefix;
            $(summaryPrefix+" .yourTax").text("£"+totalTax.toFixed(2));
            $(summaryPrefix+" .difference-annual").text("£"+differenceFromStatusQuo.toFixed(2));
            $(summaryPrefix+" .difference-monthly").text("£"+monthlyDifference.toFixed(2));
            $(summaryPrefix+" .difference-weekly").text("£"+weeklyDifference.toFixed(2));

            $(summaryPrefix).removeClass();
            if (differenceFromStatusQuo > 0)
                $(summaryPrefix).addClass("table-danger");
            else if (differenceFromStatusQuo < 0)
                $(summaryPrefix).addClass("table-success");
        }
    }
});
