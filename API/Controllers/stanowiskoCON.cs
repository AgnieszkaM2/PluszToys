using Api.table;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json.Serialization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class stanowiskoCON : ControllerBase
    {
        public readonly IConfiguration _configuration;

        public stanowiskoCON(IConfiguration configuration)
        {
            _configuration=configuration;

        }


        // GET: api/<all>
        [HttpGet("all")]
        public string Getall()
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = @"select * from stanowisko";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query,_conn);
            
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<stanowisko> stanowiskolist = new List<stanowisko>();
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                stanowisko stanowisko = new stanowisko();
                stanowisko.id_stanowisko    = Convert.ToInt32(row["id_stanowisko"]);
                stanowisko.nazwa            = Convert.ToString(row["nazwa"]);
                stanowisko.pensja           = Convert.ToInt32(row["pensja"]);
                stanowisko.lvl_dostepu      = Convert.ToInt32(row["lvl_dostepu"]);
                stanowiskolist.Add(stanowisko);
                }

            }
            if(stanowiskolist.Count > 0)
            {
               return JsonConvert.SerializeObject(stanowiskolist);
            }
            else
            {
                return JsonConvert.SerializeObject(null);
            }


        }
        // GET api/<id_nazwa>/4
        [HttpGet("id nazwa")]
        public string Getallid()
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());
                
            string query = @"select id_stanowisko, nazwa from stanowisko";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, _conn);

            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<stanowisko> stanowiskolist = new List<stanowisko>();
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    stanowisko stanowisko = new stanowisko();
                    stanowisko.id_stanowisko = Convert.ToInt32(row["id_stanowisko"]);
                    stanowisko.nazwa = Convert.ToString(row["nazwa"]);
                    stanowiskolist.Add(stanowisko);
                }

            }
            if (stanowiskolist.Count > 0)
            {
                return JsonConvert.SerializeObject(stanowiskolist);
            }
            else
            {
                return JsonConvert.SerializeObject(null);
            }


        }


        // GET api/<where id>/5
        [HttpGet("where{id}")]
        public string Get(int id)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"select * from stanowisko where id_stanowisko ={id}";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, _conn);

            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<stanowisko> stanowiskolist = new List<stanowisko>();
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    stanowisko stanowisko = new stanowisko();
                    stanowisko.id_stanowisko = Convert.ToInt32(row["id_stanowisko"]);
                    stanowisko.nazwa = Convert.ToString(row["nazwa"]);
                    stanowisko.pensja = Convert.ToInt32(row["pensja"]);
                    stanowisko.lvl_dostepu = Convert.ToInt32(row["lvl_dostepu"]);
                    stanowiskolist.Add(stanowisko);
                }

            }
            if (stanowiskolist.Count > 0)
            {
                return JsonConvert.SerializeObject(stanowiskolist);
            }
            else
            {
                return JsonConvert.SerializeObject(null);
            }
        }


        // PUT api/<stanowiskoCON>/5
        [HttpPut("{nazwa}_{pensja}_{lvl_dostepu}") ]
        public void Put(string nazwa,int pensja,int lvl_dostepu)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"INSERT INTO stanowisko (nazwa,pensja,lvl_dostepu) VALUES('{nazwa}',{pensja},{lvl_dostepu})";
            
            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.InsertCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.InsertCommand.ExecuteNonQuery();
            _conn.Close();
        }

        // DELETE api/<stanowiskoCON>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"delete from stanowisko where id_stanowisko = {id}";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.DeleteCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.DeleteCommand.ExecuteNonQuery();
            _conn.Close();
        }
    }
}

