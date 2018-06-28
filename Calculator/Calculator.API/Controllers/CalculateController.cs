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
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { };
        }

        // GET api/<controller>/5
        [HttpGet("{expression}")]
        public string Get(string expression)
        {
            string newExpression = expression.Replace('!', '+');
            newExpression = newExpression.Replace('@', '-');
            newExpression = newExpression.Replace('&', '*');
            newExpression = newExpression.Replace('$', '/');
            double result;
            try
            {
                result = Convert.ToDouble(new DataTable().Compute(newExpression, null));
            }
            catch (Exception)
            {
                return "Syntax Error!";
            }
 
            return result.ToString();
        }

        // POST api/<controller>
        [HttpPost]
        public void Post([FromBody]string value)
        {
        
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
