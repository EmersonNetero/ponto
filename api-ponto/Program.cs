var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var OpenCors = "_openCors";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: OpenCors,
        builder =>
        {
            builder.AllowAnyOrigin();
            builder.WithMethods("PUT", "DELETE", "GET", "POST");
            builder.AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(OpenCors);
app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

app.Run();
