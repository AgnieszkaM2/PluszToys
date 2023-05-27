using Api.table;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class produktCON : ControllerBase
    {

        public readonly IConfiguration _configuration;

        public produktCON(IConfiguration configuration)
        {
            _configuration = configuration;

        }


        // GET: api/<pracownicyCON>
        [HttpGet("type_desc")]
        public string Get()
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = @"select id,p_desc from type_p";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, _conn);

            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<produkt> produktlist = new List<produkt>();
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    produkt produkt = new produkt();
                    produkt.Id = Convert.ToInt16(row["id"]);
                    produkt.type = Convert.ToString(row["p_desc"]);
                    produktlist.Add(produkt);
                }

            }
            if (produktlist.Count > 0)
            {
                return JsonConvert.SerializeObject(produktlist);
            }
            else
            {
                return JsonConvert.SerializeObject(null);
            }
        }

        // GET: api/<pracownicyCON>
        [HttpGet("produkt")]
        public string Get_produkt()
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = @"select pr.id_pro,pr.nazwa,ty.p_desc from produkt pr join type_p ty on (pr.typ = ty.id)";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, _conn);

            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<produkt> produktlist = new List<produkt>();
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    produkt produkt = new produkt();
                    produkt.Id = Convert.ToInt16(row["id_pro"]);
                    produkt.nazwa = Convert.ToString(row["nazwa"]);
                    produkt.type = Convert.ToString(row["p_desc"]);
                    produktlist.Add(produkt);
                }

            }
            if (produktlist.Count > 0)
            {
                return JsonConvert.SerializeObject(produktlist);
            }
            else
            {
                return JsonConvert.SerializeObject(null);
            }
        }

        // PUT api/<produktCON>/5
        [HttpPut("nowy_produkt")]
        public void Put(string nazwa, int type)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"insert into produkt (nazwa,typ) values ('{nazwa}',{type})";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.InsertCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.InsertCommand.ExecuteNonQuery();
            _conn.Close();

        }

        // DELETE api/<produktCON>/6
        [HttpDelete("del_produkt")]
        public void Delete(int id)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"delete from produkt where id_pro = {id}";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.DeleteCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.DeleteCommand.ExecuteNonQuery();
            _conn.Close();
        }

    }
}
