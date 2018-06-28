using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Calculator.API.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CalculatorWebAPI.Controllers
{
    [Route("[controller]")]
    public class CalculateController : Controller
    {
      
      

       
        [HttpGet("{expression}")]
        public string Get(string expression)
        {
            // replace muna ng mga special characters before proceeding to calculation
            string newExpression = expression.Replace('!', '+');
            newExpression = newExpression.Replace('@', '-');
            newExpression = newExpression.Replace('&', '*');
            newExpression = newExpression.Replace('$', '/');
            double result;
            try
            {
                // here's the trick!, here's the equivalent of 'eval' function of JavaScript 
                result = Convert.ToDouble(new DataTable().Compute(newExpression, null));
            }
            catch (Exception)
            {
                return "Syntax Error!";
            }
 
            return result.ToString();
        }

    }
}
