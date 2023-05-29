using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System;
using Api.table;
using Newtonsoft.Json;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class zamCON : ControllerBase
    {
        public readonly IConfiguration _configuration;

        public zamCON(IConfiguration configuration)
        {
            _configuration = configuration;

        }

        // POST api/<zamCON>/1
        [HttpPost("klient")]
        public void new_zam(string klient)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());
            
            string query = $"insert into zama(klient, insdate, stan) values('{klient}', DEFAULT, 1)";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.InsertCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.InsertCommand.ExecuteNonQuery();
            _conn.Close();
        }

        // POST api/<zamCON>/2
        [HttpPost("zamline")]
        public void new_zam_l(int nr_zam, string material, string wypelnienie, string oczy, int ilosc , int typ_plusza, string wielkosc)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            
            string query = $"insert into listazamwie(nr_zam, material, wypelnienie, oczy, ilosc, stan, typ_plusza, wielkosc) values({nr_zam}, '{material}', '{wypelnienie}', '{oczy}', {ilosc}, 1, {typ_plusza}, '{wielkosc}')";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.InsertCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.InsertCommand.ExecuteNonQuery();
            _conn.Close();
        }
        [HttpGet("all_zam")]
        public string Get_zam()
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = @"select za.id_zam,za.klient,za.insdate,st.p_desc from zama za join stan_zam st on (za.stan = st.id)";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, _conn);

            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<zam> zamList = new List<zam>();
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    zam zam = new zam();
                    zam.id_zam = Convert.ToInt16(row["id_zam"]);
                    zam.klient = Convert.ToString(row["klient"]);
                    zam.insdate = Convert.ToDateTime(row["insdate"]);
                    zam.stan_zam = Convert.ToString(row["p_desc"]);
                    zamList.Add(zam);
                }

            }
            if (zamList.Count > 0)
            {
                return JsonConvert.SerializeObject(zamList);
            }
            else
            {
                return JsonConvert.SerializeObject(null);
            }
        }

        // POST api/<zamCON>/3
        [HttpGet("all_zaml")]
        public string Get_zamL(int nr_zam)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"select lza.nr_zam,lza.material,lza.wypelnienie,lza.oczy,lza.ilosc,st.p_desc stan,tpu.p_desc pluszak,lza.wielkosc from listazamwie lza join stan_zam st on (lza.stan = st.id) join typ_plusz tpu on (lza.typ_plusza = tpu.id) where Lza.nr_zam = {nr_zam}";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, _conn);

            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<zamL> zamLList = new List<zamL>();
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    zamL zamL = new zamL();
                    zamL.nr_zam = Convert.ToInt16(row["nr_zam"]);
                    zamL.material = Convert.ToString(row["material"]);
                    zamL.wypelnienie = Convert.ToString(row["wypelnienie"]);
                    zamL.oczy = Convert.ToString(row["oczy"]);
                    zamL.ilosc = Convert.ToInt16(row["ilosc"]);
                    zamL.stan_line = Convert.ToString(row["stan"]);
                    zamL.typ_plusza = Convert.ToString(row["pluszak"]);
                    zamL.wielkosc = Convert.ToString(row["wielkosc"]);
                    zamLList.Add(zamL);
                }

            }
            if (zamLList.Count > 0)
            {
                return JsonConvert.SerializeObject(zamLList);
            }
            else
            {
                return JsonConvert.SerializeObject(null);
            }
        }

        // PUT api/<zamCON>/5
        [HttpPut("update_Zam")]
        public void Uzam(int stan, int id_zam)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"update zama set stan = {stan} where id_zam = {id_zam}";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.InsertCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.InsertCommand.ExecuteNonQuery();
            _conn.Close();
        }

        // PUT api/<zamCON>/5
        [HttpPut("update_ZamL")]
        public void UzamL(int stan, int id_zam)
        {
            SqlConnection _conn = new SqlConnection(_configuration.GetConnectionString("magazyn").ToString());

            string query = $"update listazamwie set stan = {stan} where nr_zam = {id_zam}";

            _conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            sqlDataAdapter.InsertCommand = new SqlCommand(query, _conn);
            sqlDataAdapter.InsertCommand.ExecuteNonQuery();
            _conn.Close();
        }
    }
}
