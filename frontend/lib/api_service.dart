import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl = 'http://localhost:3000/api';

  Future<List<dynamic>> fetchUtilisateurs() async {
    final response = await http.get(Uri.parse('$baseUrl/utilisateurs'));
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Erreur lors du fetch');
    }
  }

  Future<void> addUtilisateur(String nom, String email, String phone) async {
    final response = await http.post(
      Uri.parse('$baseUrl/utilisateurs'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'nom': nom, 'email': email, 'phone': phone}),
    );
    if (response.statusCode != 201) {
      throw Exception('Erreur lors de l\'ajout');
    }
  }
}
