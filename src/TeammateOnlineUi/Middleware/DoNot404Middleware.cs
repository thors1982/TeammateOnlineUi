using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace TeammateOnlineUi.Middleware
{
    public class DoNot404Middleware
    {
        private readonly RequestDelegate _next;

        public DoNot404Middleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            await _next(context);

            if(context.Response.StatusCode == (int)HttpStatusCode.NotFound)
            {
                await ReturnIndexPage(context);
            }
        }

        private static async Task ReturnIndexPage(HttpContext context)
        {
            var file = new FileInfo(@"index.html");
            byte[] buffer;
            if (file.Exists)
            {
                context.Response.StatusCode = (int)HttpStatusCode.OK;
                context.Response.ContentType = "text/html";
                buffer = File.ReadAllBytes(file.FullName);
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                context.Response.ContentType = "text/plain";
                buffer = Encoding.UTF8.GetBytes("Unable to find the requested file");
            }

            using (var stream = context.Response.Body)
            {
                await stream.WriteAsync(buffer, 0, buffer.Length);
                await stream.FlushAsync();
            }

            context.Response.ContentLength = buffer.Length;
        }
    }
}
