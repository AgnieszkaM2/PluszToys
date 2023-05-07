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
    public class pracownicyCON : ControllerBase
    {
        public readonly IConfiguration _configuration;

        public pracownicyCON(IConfiguration configuration)
        {
            _configuration = configuration;

        }

        // GET: api/<pracownicyCON>
        [HttpGet("all")]
        public string Get()
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = @"select * from pracownicy join stanowisko on stanowisko.id_stanowisko = pracownicy.stanowisko";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, _conn);

            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<pracownicy> pracownicylist = new List<pracownicy>();
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    pracownicy pracownicy = new pracownicy();
                    pracownicy.id_pra = Convert.ToInt16(row["id_pra"]);
                    pracownicy.data_zatr = Convert.ToDateTime(row["data_zatr"]);
                    pracownicy.imie = Convert.ToString(row["imie"]);
                    pracownicy.stanowiskostr = Convert.ToString(row["stanowisko"]);
                    pracownicy.nazwisko = Convert.ToString(row["nazwisko"]);
                    pracownicylist.Add(pracownicy);
                }

            }
            if (pracownicylist.Count > 0)
            {
                return JsonConvert.SerializeObject(pracownicylist);
            }
            else
            {
                return JsonConvert.SerializeObject(null);
            }
        }
        // GET: api/<pracownicyCON>
        [HttpGet("login")]
        public string login(string imie,string nazwisko, string haslo )
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"select id_pra, stanowisko from pracownicy where imie='{imie}' and nazwisko='{nazwisko}' and haslo = '{haslo}'";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, _conn);

            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<pracownicy> pracownicylist = new List<pracownicy>();
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    pracownicy pracownicy = new pracownicy();
                    pracownicy.id_pra = Convert.ToInt16(row["id_pra"]);
                    pracownicy.stanowiskostr = Convert.ToString(row["stanowisko"]);
                    pracownicylist.Add(pracownicy);
                }

            }
            if (pracownicylist.Count > 0)
            {
                return JsonConvert.SerializeObject(pracownicylist);
            }
            else
            {
                return JsonConvert.SerializeObject(null);
            }
        }
        // GET api/<pracownicyCON>/5
        [HttpGet("where{id}")]
        public string Get(int id)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"select * from pracownicy join stanowisko on stanowisko.id_stanowisko = pracownicy.stanowisko where pracownicy.id_pra = {id}";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, _conn);

            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<pracownicy> pracownicylist = new List<pracownicy>();
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    pracownicy pracownicy = new pracownicy();
                    pracownicy.id_pra = Convert.ToInt16(row["id_pra"]);
                    pracownicy.data_zatr = Convert.ToDateTime(row["data_zatr"]);
                    pracownicy.imie = Convert.ToString(row["imie"]);
                    pracownicy.stanowiskostr = Convert.ToString(row["stanowisko"]);
                    pracownicy.nazwisko = Convert.ToString(row["nazwisko"]);
                    pracownicylist.Add(pracownicy);
                }

            }
            if (pracownicylist.Count > 0)
            {
                return JsonConvert.SerializeObject(pracownicylist);
            }
            else
            {
                return JsonConvert.SerializeObject(null);
            }
        }

        // PUT api/<pracownicyCON>/5
        [HttpPut("nowy_pracownik")]
        public void Put(string imie, string nazwisko, int stanowisko)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"insert into pracownicy (imie,nazwisko,stanowisko) values('{imie}','{nazwisko}',{stanowisko})";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.InsertCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.InsertCommand.ExecuteNonQuery();
            _conn.Close();

        }

        // DELETE api/<pracownicyCON>/5
        [HttpDelete("zwolnienie{id}")]
        public void Delete(int id)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"delete from pracownicy where id_pra = {id}";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.DeleteCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.DeleteCommand.ExecuteNonQuery();
            _conn.Close();
        }
        // update api/<pracownicyCON>/6
        [HttpPut("zmiana_stanowisko {id}")]
        public void zmianastanowiska(int id, int stanowisko)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"update pracownicy set stanowisko = {stanowisko} where pracownicy.id_pra = {id}";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.UpdateCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.UpdateCommand.ExecuteNonQuery();
            _conn.Close();
        }
        // update api/<pracownicyCON>/7
        [HttpPut("update_password_id,starehaslo,nowehaslo")]
        public void zmianahasla(int id, string starehaslo,string nowehaslo)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"update pracownicy set haslo = '{nowehaslo}' where id_pra = {id} and haslo = '{starehaslo}'";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.UpdateCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.UpdateCommand.ExecuteNonQuery();
            _conn.Close();
        }
    }
}
