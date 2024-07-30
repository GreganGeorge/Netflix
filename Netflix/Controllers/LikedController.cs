using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Win32;
using Netflix.Models;

namespace Netflix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikedController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public LikedController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public ActionResult Get1(int movie_id, int login_id)
        {
            string query = "select liked_id from liked where movie_id=@movie_id and login_id=@login_id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Netflix");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@movie_id", movie_id);
                    myCommand.Parameters.AddWithValue("@login_id", login_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [Route("Get2")]
        [HttpGet]
        public ActionResult Get2(int login_id)
        {
            string query = "select * from liked where login_id=@login_id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Netflix");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@login_id", login_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(int login_id, int movie_id, string type)
        {
            string query = @"insert into liked values(@login_id,@movie_id,@type)";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Netflix");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@login_id", login_id);
                    myCommand.Parameters.AddWithValue("@movie_id", movie_id);
                    myCommand.Parameters.AddWithValue("@type", type);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }
        [HttpDelete]
        public JsonResult Delete(int login_id, int movie_id)
        {
            string query = @"delete from liked where login_id=@login_id and movie_id=@movie_id";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Netflix");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@login_id", login_id);
                    myCommand.Parameters.AddWithValue("@movie_id", movie_id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
