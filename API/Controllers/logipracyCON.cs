using Api.table;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Metadata;
using Newtonsoft.Json;
using System.Data;
using System.Security.Cryptography;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class logipracyCON : ControllerBase
    {

        public readonly IConfiguration _configuration;

        public logipracyCON(IConfiguration configuration)
        {
            _configuration = configuration;

        }


        // GET: api/<logipracyCON>
        [HttpGet]
        public string wyplata(int miesiec)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"select q.h * st.pensja as pensja, pr.imie" +
                $"\r\nfrom stanowisko st" +
                $"\r\njoin (" +
                $"\r\nselect pra.id_pra as id_pra ,pra.stanowisko as id, sum(lo.iloscgodzin) as h" +
                $"\r\nfrom logipracy lo " +
                $"\r\njoin pracownicy pra on pra.id_pra = lo.id_pra" +
                $"\r\nwhere MONTH(lo.insdate) = {miesiec}" +
                $"\r\ngroup by lo.insdate, pra.id_pra,pra.stanowisko" +
                $"\r\n) as q on q.id = st.id_stanowisko" +
                $"\r\njoin pracownicy pr on pr.id_pra = q.id_pra;";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, _conn);

            DataTable dt = new DataTable();
            List<logipracy> logipracylis = new List<logipracy>();
            sqlDataAdapter.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    logipracy logipracy = new logipracy();
                    logipracy.imie = Convert.ToString(row["imie"]);
                    logipracy.wyplata = Convert.ToInt32(row["pensja"]);
                    logipracylis.Add(logipracy);
                }

            }
            if (logipracylis.Count > 0)
            {
                return JsonConvert.SerializeObject(logipracylis);
            }
            else
            {
                return JsonConvert.SerializeObject(null);
            }

        }

        // GET api/<logipracyCON>/5
        [HttpPut("nowy_pracownik")]
        public void Put(int id, int godziny)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"insert into logipracy (id_pra, iloscgodzin) values ({id},{godziny});";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.InsertCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.InsertCommand.ExecuteNonQuery();
            _conn.Close();

        }
    }
}
